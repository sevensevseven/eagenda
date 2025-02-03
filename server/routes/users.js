import joi from "joi"
import passwordComplexity from "joi-password-complexity"
import express from "express"
import bcrypt from "bcrypt"
import db from "../db"
import process from "process"

const router = express.Router();

function findUser(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `email`= ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

function createUser(first, last, email, password) {
    return new Promise((resolve, reject) => {
        const sql =
            "INSERT INTO users (`first`,`last`,`email`,`password`) VALUES (?, ?, ?, ?)";
        const values = [first, last, email, password];
        db.query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});
        
        const user = await findUser(req.body.email);
        if (user.length != 0) return res.status(409).send({message: "User with given email already exists!"});
    
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await createUser(req.body.first, req.body.last, req.body.email, hashPassword);
        res.status(201).send({message: "User created successfully!"});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
});

const validate = (data) => {
    const schema = joi.object({
        first: joi.string().required().label("First Name"),
        last: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
}

export default router;