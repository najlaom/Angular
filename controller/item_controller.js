const Item = require ('../model/item_model.js'); // inclut le schéma de 
const router = require('express').Router();
const multer = require('multer');
let mongoose = require('mongoose');
const cors = require('cors');
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

  router.post('/create-item', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      intitule: req.body.intitule,
      description : req.body.description,
      partner: req.body.partner,
      image: url + '/public/' + req.file.filename,
      isActive: true
    });
   item.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Item registered successfully!",
        userCreated: {
          _id: result._id,
          intitule: result.intitule,
          description: result.description,
          partner: result.partner,
          image: result.image,
          isActive: false
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  })
 router.listItem = (req, res, next) => {
  Item.find() //fetches all the posts
     .then(result => {
         res.send(result);
     }).catch(err => {
         res.status(400).send(err);
     })
}
router.listItemByPartner = (req, res, next) => {
  Item.find({
       partner:req.params.id }) //fetches all the posts
     .then(result => {
         res.send(result);
     }).catch(err => {
         res.status(400).send(err);
     })
}

router.singleItem = (req, res, next) => {
    Item.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.updateItem = (req, res) => {
    var id = req.params.id;
    Item.update({_id: id}, req.body)
    .then(item => {
        if(!item) res.json({success :false, result: "item does not exist"})
        
        res.json(item)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
},

router.deleteItem = (req, res, next) => {
    Item.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('item deleted');
      })
      .catch(err => res.status(400).send(err));
};

module.exports = router;