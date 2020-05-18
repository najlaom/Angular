const Player = require ('../model/player_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());

router.addPlayer = async (req, res, next) => {
    try {
        const p = new Player({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            coins: req.body.coins,
            gems: req.body.gems,
            role: 'player',
            adress: req.body.adress,
            password: req.body.password,
            status: false
    
        });
        const player = await Player.create(p);
        return res.status(200).json({
            success: true,
            data: player
        });
       
    } catch (err){
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This player alrady exist'});
        }
        res.status(500).json({error : 'server Error'})
    }
}
 
 router.listPlayer = (req, res, next) => {
    Player.find() //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
};
router.singlePlayer = (req, res, next) => {
    Player.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
};
router.updatePlayer = (req, res) => {
    var id = req.params.id;
    Player.update({_id: id}, req.body)
    .then(player=> {
        if(!player) res.json({success :false, result: "player does not exist"})
        
        res.json(player)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
};
router.deletePlayer = (req, res, next) => {
    Player.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('Player deleted');
      })
      .catch(err => res.status(400).send(err));
};
module.exports = router;