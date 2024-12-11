const router = require("express").Router();
const db = require("../db")

function findDosare(uid) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `dosare` WHERE `userid`=?";
        db.query(sql, [uid], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        const dosare = await findDosare(req.body.uid);

        dosare.forEach(dosar => {
            jsonData = JSON.parse(dosar.dosardata);
            dosar.dosardata = jsonData
        });

        res.status(201).send({data: dosare, message: "Fetched successgfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

module.exports = router;