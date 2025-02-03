const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("../db").default;
const jwt = require("jsonwebtoken")

function findUser(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `email`= ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

function generateAuthToken(toBeEncrypted) {
    const token = jwt.sign({id: toBeEncrypted}, process.env.JWTPRIVATEKEY, {expiresIn: "3d"});
    return token;
};

router.post("/", async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});
        
        const user = await findUser(req.body.email)
        if (user.length == 0) return res.status(401).send({message: "Invalid Email or Password"});

        const validPassword = await bcrypt.compare(
            req.body.password, user[0].password
        );

        if (!validPassword) return res.status(401).send({message: "Invalid Email or Password"});
    
        const token = generateAuthToken(user[0].id);

        res.status(200).send({data: token, message: "Logged in successfully"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });

    return schema.validate(data);
}

module.exports = router;