const router = require('express').Router();

router.post('/', (req, res) => {
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
    res.json({ success: true });
});

module.exports = router;