const EventPlayer = require ('../model/eventPlayer_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());

router.addEventPlayer = async (req, res, next) => {
    try {
        const eventPlayer  = await EventPlayer.create(req.body);
        return res.status(200).json({
            success: true,
            data: eventPlayer
        });
       
    } catch (err){
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This publicityPlayer alrady exist'});
        }
        res.status(500).json({error : 'server Error'})
    }
}
router.showEventPlayer  = (req, res, next) => {
    EventPlayer.find() //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
 
 module.exports = router;