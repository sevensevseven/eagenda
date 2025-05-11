const router = require('express').Router();
const axios = require("axios");
const querystring = require("querystring");

router.post("/", async (req, res) => {
    const { captchaValue } = req.body;

    if (!captchaValue) {
        return res.status(400).json({ success: false, message: "Captcha token is required" });
    }

    try {
        const payload = querystring.stringify({
            secret: process.env.SITE_SECRET,
            response: captchaValue
        });

        const { data } = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            payload,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        res.json(data);
    } catch (error) {
        console.error("CAPTCHA verification error:", error);
        res.status(500).json({ success: false, message: "Failed to verify reCAPTCHA" });
    }
});

module.exports = router;