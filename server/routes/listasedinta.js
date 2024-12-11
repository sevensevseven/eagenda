const router = require("express").Router();
const portal = require("../portal")

router.post("/", async (req, res) => {
    try {
        const sedinte = await portal.cautareSedinte(req.body.dataSedinta, req.body.institutie);
        
        res.status(200).send(sedinte);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = router;
