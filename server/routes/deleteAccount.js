const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

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
    // const { email } = req.body;

    // if (!email) {
    //     return res.status(400).json({ success: false, message: "Email is required" });
    // }

    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ valid: false, error: 'No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await findUserById(decoded.id);
    if (!user.length) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user[0].verified === 1) {
        return res.status(400).json({ success: false, message: "You cannot delete a verified account." });
    }

    try {
        const sql = "DELETE FROM users WHERE `id` = ?";
        db.query(sql, [decoded.id], (err, result) => {
            if (err) {
                console.error("Error deleting user:", err);
                return res.status(500).json({ success: false, message: "Internal server error" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

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

            res.json({ success: true, message: "Account deleted successfully" });
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;