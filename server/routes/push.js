const router = require("express").Router();
const db = require("../db")

function createDosar(requestbody) {
    return new Promise((resolve, reject) => {
        const sql =
            "INSERT INTO dosare (`userid`,`numardosar`,`institutie`,`dosardata`,`lastsync`) VALUES (?, ?, ?, ?, ?)";
        const values = [requestbody.userid, requestbody.numardosar, requestbody.institutie, JSON.stringify(requestbody.dosardata), new Date(requestbody.lastsync)];
        db.query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

function findDosar(requestbody) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `dosare` WHERE `userid`=? AND `numardosar`=? AND `institutie`=?";
        db.query(sql, [requestbody.userid, requestbody.numardosar, requestbody.institutie], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        const dosare = await findDosar(req.body);
        if (dosare.length != 0) return res.status(409).send({message: "Dosarul a fost deja adaugat!"});

        await createDosar(req.body)
        res.status(201).send({message: "User created successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

module.exports = router;