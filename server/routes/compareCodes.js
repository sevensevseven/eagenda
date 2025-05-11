const router = require("express").Router();
const db = require("../db");

function findUser(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `email`= ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function deleteCodeAndVerify(email) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET `temp_code` = NULL, `last_code_sent_at` = NULL, `verified` = true WHERE `email` = ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

router.post("/", async (req, res) => {
    const { code, email } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, message: "Code is required" });
    }

    try {
        const user = await findUser(email);
        if (user.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userData = user[0];
        const currentTime = Date.now();
        const lastCodeSentAt = userData.last_code_sent_at;

        if (!lastCodeSentAt) {
            return res.status(400).json({ success: false, message: "No code was sent" });
        }

        if (currentTime - lastCodeSentAt > 5 * 60 * 1000) {
            return res.status(400).json({ success: false, message: "Code expired" });
        }

        if (userData.temp_code !== code) {
            return res.status(400).json({ success: false, message: "Invalid code" });
        }
    
        await deleteCodeAndVerify(email);

        res.json({ success: true, message: "Code verified successfully" });
    } catch (error) {
        console.error("Error verifying code:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;