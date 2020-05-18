const Publicity = require ('../model/publicity_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());

router.addPublicity = async (req, res, next) => {
    try {
        const pub = new Publicity({
            namePublicity: req.body.namePublicity,
            description: req.body.description,
            partner: req.body.partner,
            url: req.body.url,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isActive: false
    
        });
        const publicity = await Publicity.create(pub);
        return res.status(200).json({
            success: true,
            data: publicity
        });
       
    } catch (err){
        console.error(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'This publicity alrady exist'});
        }
        res.status(500).json({error : 'server Error'})
    }
}


 router.listPublicity = (req, res, next) => {
    Publicity.find() //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.listPublicityByPartner = (req, res, next) => {
    Publicity.find({
         partner:req.params.id }) //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}

router.singlePublicity  = (req, res, next) => {
    Publicity.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.updatePublicity = (req, res) => {
    var id = req.params.id;
    Publicity.update({_id: id}, req.body)
    .then(publicity=> {
        if(!publicity) res.json({success :false, result: "publicity does not exist"})
        
        res.json(publicity)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
};
router.deletePublicity = (req, res, next) => {
    Publicity.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('publicity deleted');
      })
      .catch(err => res.status(400).send(err));
};
module.exports = router;