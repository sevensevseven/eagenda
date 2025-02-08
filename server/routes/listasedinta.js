import express from 'express';
import portal from "../portal.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const sedinte = await portal.cautareSedinte(req.body.dataSedinta, req.body.institutie);
        
        res.status(200).send(sedinte);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

export default router;
