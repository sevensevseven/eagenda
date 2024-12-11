const router = require("express").Router();
const db = require("../db");

function change(val1, val2, id) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `users` SET `emailmodificari`=?, `emailsedinte`=? WHERE `id`=?";
        db.query(sql, [val1, val2, id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        await change(req.body.emailmodificari, req.body.emailsedinte, req.body.userid);

        res.status(200).send({message: "Changed"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = router;