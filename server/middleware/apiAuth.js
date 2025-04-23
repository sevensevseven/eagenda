const jwt = require('jsonwebtoken'); 

const authenticateJWT = (req, res, next) => {
    if (['/api/auth', '/api/users', '/api/validateToken', '/api/webhook', '/api/logout'].includes(req.path)) {
        return next(); 
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }

        req.user = user;

        next();
    });
};

module.exports = authenticateJWT;