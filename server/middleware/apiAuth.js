import process from 'process';
import jwt from 'jsonwebtoken'; 

const authenticateJWT = (req, res, next) => {
    if (['/api/auth', '/api/users', '/api/webhook'].includes(req.path)) {
        return next(); 
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }

        req.user = user;

        next();
    });
};

export default authenticateJWT;