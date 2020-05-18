const Accessory = require ('../model/accessory_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
const multer = require('multer');
router.use(cors());
// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
    }
  });

  // Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
  
 router.post('/addAccessory', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
       const accessory = new Accessory({
            intitule: req.body.intitule,
            title: req.body.title,
            image: url + '/public/' + req.file.filename,
            state: true,
            price: req.body.price,
            startDate :req.body.startDate,
            endDate:req.body.endDate
              
        });
        accessory.save().then(result => {
          console.log(result);
          res.status(201).json({
            message: "Accessory registered successfully!",
            userCreated: {
              _id: result._id,
              intitule: result.intitule,
              title: result.title,
              price: result.price,
              image: result.image,
              state: true
              
            }
          })
        }).catch(err => {
          console.log(err),
            res.status(500).json({
              error: err
            });
        })
      })
       
 router.listAccessory = (req, res, next) => {
    Accessory.find() //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.singleAccessory = (req, res, next) => {
    Accessory.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}

router.updateAccessory = (req, res) => {
    var id = req.params.id;
    Accessory.update({_id: id}, req.body)
    .then(accessory => {
        if(!accessory) res.json({success :false, result: "accessory does not exist"})
        
        res.json(accessory)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
},
router.deleteAccessory = (req, res, next) => {
    Accessory.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('accessory deleted');
      })
      .catch(err => res.status(400).send(err));
};
module.exports = router;