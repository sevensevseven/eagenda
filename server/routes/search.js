import express from 'express';
import portal from '../portal.js';

const router = express.Router();
router.post("/", async (req, res) => {
    try {
        
        const dosare = await portal.cautareDosare(req.body.numarDosar, "", req.body.numeParte, req.body.institutie != "" ? req.body.institutie : undefined);
        
        res.status(200).send(dosare);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

export default router;
