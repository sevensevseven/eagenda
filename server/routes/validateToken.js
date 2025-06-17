const db = require("../db");
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ valid: false, error: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

        const userCheck = await new Promise((resolve, reject) => {
            db.query("SELECT verified FROM users WHERE id = ?", [decoded.id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        if (!userCheck.length || userCheck[0].verified !== 1) {
            res.clearCookie('token', {
                httpOnly: true,
                secure:  process.env.NODE_ENV === 'production',  // true in prod
                sameSite: process.env.NODE_ENV === 'production' 
                           ? 'none'    // cross-site in prod
                           : 'lax',    // first-party in dev
                domain: '.curiachronos.ro',
                path: '/',                // make it available on all routes
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            
            return res.status(401).json({ valid: false, error: 'User not found.' });
        }

        return res.status(200).json({ valid: true, payload: decoded });
    } catch (err) {
        return res.status(401).json({ valid: false, error: 'Invalid or expired token.' });
    }
});

module.exports = router;