const router = require("express").Router();
const db = require("../db");

router.post("/", async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Id is required" });
    }

    try {
        const sql = "DELETE FROM users WHERE `id` = ?";
        db.query(sql, [id], (err, result) => {
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