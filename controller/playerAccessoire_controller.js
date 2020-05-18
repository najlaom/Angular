const PlayerAccessory = require ('../model/playerAccessory_model.js') // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());


 router.addAccessoryPlayer = async (req, res, next) => {
     try {
         const playerAccessory  = await PlayerAccessory.create(req.body);
         return res.status(200).json({
             success: true,
             data: playerAccessory
         });
        
     } catch (err){
         console.error(err);
         if(err.code === 11000) {
             return res.status(400).json({ error: 'This publicityPlayer alrady exist'});
         }
         res.status(500).json({error : 'server Error'})
     }
 }
 router.singleAccessoryPlayer  = (req, res, next) => {
     PlayerAccessory.find() //filters the posts by Id
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        })
 }
 
 module.exports = router;