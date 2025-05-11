const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    // Extract token from HTTP-only cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access Denied. No token provided.');
    }

    // Verify the token signature and expiration
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch (err) {
        return res.status(401).send('Invalid or expired token.');
    }

    try {
        res.status(200).json({ id: decoded.id });
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = router;