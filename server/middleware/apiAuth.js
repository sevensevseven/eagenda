const jwt = require('jsonwebtoken'); 

const authenticateJWT = (req, res, next) => {
    if (['/api/auth', '/api/users', '/api/validateToken', '/api/webhook', '/api/logout', '/api/captcha'].includes(req.path)) {
        return next(); 
    }

    const accessToken = req.cookies.token;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    jwt.verify(accessToken, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }

        req.user = user;

        next();
    });
};

module.exports = authenticateJWT;