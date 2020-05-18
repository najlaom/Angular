const Event = require ('../model/event_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());


router.addEvent = async (req, res, next) => {
    try {
        const evnt = new Event({
            title: req.body.title,
            description: req.body.description,
            partner: req.body.partner,
            numberParticipants: req.body.numberParticipants,
            maxNumberParticipant: req.body.maxNumberParticipant,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            adress: req.body.adress,
            isActive: false
    
        });
        const event = await Event.create(evnt);
        return res.status(200).json({
            success: true,
            data: event
        });
       
    } catch (err){
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This event alrady exist'});
        }
        res.status(500).json({error : 'server Error'})
    }
}

 router.listEvent = (req, res, next) => {
    Event.find() //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.listEventByPartner = (req, res, next) => {
    Event.find({
         partner:req.params.id }) //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.singleEvent = (req, res, next) => {
    Event.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}

router.updateEvent = (req, res) => {
    var id = req.params.id;
    Event.update({_id: id}, req.body)
    .then(event => {
        if(!event) res.json({success :false, result: "item does not exist"})
        
        res.json(event)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
},
router.deleteEvent = (req, res, next) => {
    Event.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('event deleted');
      })
      .catch(err => res.status(400).send(err));
};
module.exports = router;