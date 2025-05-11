const querystring = require("querystring");
const axios = require("axios");
const router = require("express").Router();
const db = require("../db");
const MailJet = require('node-mailjet')

const mailjet = new MailJet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET
})

function createCode(email, code) {
    return new Promise((resolve, reject) => {
        const now = Date.now();
        const sql = "UPDATE users SET `temp_code` = ?, `last_code_sent_at` = ? WHERE `email` = ?";
        const values = [code, now, email];
        db.query(sql, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function findUser(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE `email`= ?";
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function sendEmail(user, code) {
    const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                    "From": {
                        "Email": "noreply@curiachronos.ro",
                        "Name": "Notificari CuriaChronos"
                    },
                    "To": [
                        {
                            "Email": user.email,
                            "Name": user.name
                        }
                    ],
                    "Subject": `[${code}] Cod de verificare CuriaChronos`,
                    "TextPart": `Bună ziua,\n\nCodul dumneavoastră de verificare CuriaChronos este: ${code}\n\nIntroduceți acest cod în aplicație pentru a continua procesul de înregistrare.\n\nDacă nu ați solicitat acest cod, puteți ignora acest mesaj.\n\nCu respect,\nEchipa CuriaChronos`
                }
            ]
        })

    request
        .catch((err) => {
            console.log(err)
        })
}

router.post("/", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find user
        const userArr = await findUser(email);
        if (!userArr || userArr.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = userArr[0];
        // Check last_code_sent_at
        if (user.last_code_sent_at && Date.now() - user.last_code_sent_at < 60 * 1000) {
            const secondsLeft = Math.ceil((60 * 1000 - (Date.now() - user.last_code_sent_at)) / 1000);
            return res.status(429).json({ message: `Așteptați ${secondsLeft} secunde înainte de a solicita un nou cod.` });
        }
        // Generate code
        const code = Math.floor(100000 + Math.random() * 900000);
        await createCode(email, code);
        await sendEmail(user, code);
        return res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;