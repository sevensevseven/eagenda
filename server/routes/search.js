const router = require("express").Router();
const portal = require("../portal")

router.post("/", async (req, res) => {
    try {
        
        const dosare = await portal.cautareDosare(req.body.numarDosar, "", req.body.numeParte, req.body.institutie != "" ? req.body.institutie : undefined);
        
        res.status(200).send(dosare);
        
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = router;
