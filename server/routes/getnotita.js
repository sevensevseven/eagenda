const router = require("express").Router();
const db = require("../db")

function findNotita(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `notita` WHERE `notitaid`=?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        var notite = [];

        for (let index = 0; index < req.body.notitaids.length; index++) {
            const value = await findNotita(req.body.notitaids[index])
            
            console.log(`${value.length}\n${JSON.stringify(value[0])}`)
            if (value.length > 0) notite.push(value[0]);
        }

        console.log("ok" + notite)
        
        res.status(200).send(notite);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

module.exports = router;