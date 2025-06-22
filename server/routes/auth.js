const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("../db");
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

function saveNewlyHashedPassword(newPassword, id) {
    return new Promise((resolve, reject) => {
        const sql =
            "UPDATE `users` SET `password`=? WHERE `id`=?";
        const values = [newPassword, id];
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
        const {error} = validate(req.body);
        if (error) return res.status(400).send({message: error.details[0].message});
        
        const user = await findUser(req.body.email)
        if (user.length == 0) return res.status(401).send({message: "Invalid Email or Password"});

        const validPassword = await bcrypt.compare(
            req.body.password, user[0].password
        );

        if (!validPassword) return res.status(401).send({message: "Invalid Email or Password"});
    
        const token = generateAuthToken(user[0].id);

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

        const actualCost = parseInt(user[0].password.split('$')[2]);
        if (actualCost < process.env.SALT) {
            console.log(`Updating password for user ${user[0].email} to match new bcrypt cost`);
            const newHash = bcrypt.hash(password, process.env.SALT);
            await saveNewlyHashedPassword(newHash, user[0].id); // update DB
        }

        return res.json({ success: true });
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