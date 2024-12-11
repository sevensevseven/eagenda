const jwt = require('jsonwebtoken');
const router = require("express").Router();
const db = require("../db")

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `id`= ?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied. No token provided.');

    try {
        const decoded = parseJwt(token)
        const user = await findUserById(decoded.id);
        
        res.status(200).send(user);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = router;
