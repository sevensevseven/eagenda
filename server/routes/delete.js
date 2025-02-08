import express from "express";
import db from "../db.js";

const router = express.Router();

function deleteDosar(reqbody) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `dosare` WHERE `userid`=? AND `numardosar`=? AND `institutie`=?";
        db.query(sql, [reqbody.uid, reqbody.numardosar, reqbody.institutie], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
}

router.post("/", async (req, res) => {
    try {
        deleteDosar(req.body)

        res.status(201).send({message: "Deleted successgfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
});

export default router;