import express from 'express';
import db from '../db.js';

const router = express.Router();

function createNotita(requestbody) {
    return new Promise((resolve, reject) => {
        const sql =
            "INSERT INTO notita (`notitaid`, `value`) VALUES (?, ?)";
        const values = [requestbody.notitaid, requestbody.value];
        db.query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

function findNotita(requestbody) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `notita` WHERE `notitaid`=?";
        db.query(sql, [requestbody.notitaid], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

function updateNotita(requestbody) {
    return new Promise((resolve, reject) => {
        const sql =
            "UPDATE `notita` SET `value`=? WHERE `notitaid`=?";
        const values = [requestbody.value, requestbody.notitaid];
        db.query(sql, values, (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        const notita = await findNotita(req.body);
        if (notita.length != 0) {
            await updateNotita(req.body);
            return res.status(200).send({message: "Updated!"});
        }

        await createNotita(req.body)
        res.status(200).send({message: "Created!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

export default router;