import express from 'express';
import db from "../db.js";

const router = express.Router();

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
            const jsonData = JSON.parse(dosar.dosardata);
            dosar.dosardata = jsonData
        });

        res.status(201).send({data: dosare, message: "Fetched successgfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

export default router;