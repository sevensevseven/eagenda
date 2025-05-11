const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db")
const joi = require("joi")
const passwordComplexity = require("joi-password-complexity");
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

function generateAuthToken(toBeEncrypted) {
    const token = jwt.sign({id: toBeEncrypted}, process.env.JWTPRIVATEKEY, {expiresIn: "3d"});
    return token;
};

router.post("/", async (req, res) => {
    try {
        const { error } = validate((({ confirmPassword, ...rest }) => rest)(req.body));
        if (error) return res.status(400).send({message: error.details[0].message});
        
        const user = await findUser(req.body.email);
        if (user.length != 0) return res.status(409).send({message: "User with given email already exists!"});
    
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await createUser(req.body.first, req.body.last, req.body.email, hashPassword);

        const userAfterCreate = await findUser(req.body.email); // fetch full user
        const token = generateAuthToken(userAfterCreate[0].id);

        res.cookie('token', token, {
            httpOnly: true,
            secure:  process.env.NODE_ENV === 'production',  // true in prod
            sameSite: process.env.NODE_ENV === 'production' 
                       ? 'none'    // cross-site in prod
                       : 'lax',    // first-party in dev
            domain: '.curiachronos.ro',
            path: '/',                // make it available on all routes
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

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

module.exports = router;