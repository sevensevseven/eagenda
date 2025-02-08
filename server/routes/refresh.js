import express from 'express';
import db from '../db.js';
import portal from '../portal.js';

const router = express.Router();
function updateDosar(requestbody, dosardata) {
    return new Promise((resolve, reject) => {
        const sql =
            "UPDATE `dosare` SET `dosardata`=?,`lastsync`=? WHERE `userid`=? AND `numardosar`=? AND `institutie`=?";
        const values = [JSON.stringify(dosardata), new Date(Date.now()), requestbody.userid, requestbody.numardosar, requestbody.institutie];
        db.query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        const newDosar = await portal.cautareDosare(req.body.numardosar, "", "", req.body.institutie);

        await updateDosar(req.body, newDosar[0])
        res.status(201).send({message: "Dosar updated successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

export default router;