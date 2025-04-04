const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, error: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

        return res.status(200).json({ valid: true, payload: decoded });
    } catch (err) {
        return res.status(401).json({ valid: false, error: 'Invalid or expired token.' });
    }
});

module.exports = router;