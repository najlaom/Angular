const router = require('express').Router();
const Admin = require('../model/admin_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../app');
const cors = require('cors');
router.use(cors());
process.env.SECRET_KEY = 'secret';


router.addAdmin = (function(req,res, next){
    const admin = new Admin({
        email: req.body.email,
        username: req.body.username,
        password: Admin.hashPassword(req.body.password),
        creation_dt: Date.now()
    });
    let promise = admin.save();
    promise.then(function(doc){
        return res.status(201).json(doc);
    })
    promise.catch(function(err){
        return res.status(501).json({message: 'Error registering admin.'})
    })
    
})


router.login = (function(req,res, next){
    let data = {
        token : '',
        id : '',
        username : '',
        email: '',
        password: ''
    }
    let promise = Admin.findOne({email: req.body.email}).exec();

    promise.then(function(doc){
        if(doc){
            if(doc.isValid(req.body.password)){
                //generate token
                let token = jwt.sign({username:doc.username},'secret', {expiresIn: '3h'});

               data.token = token ;
               data.id = doc._id;
               data.username = doc.username;
               data.email = doc.email;
               data.password = doc.password;
               console.log(data);
                return res.status(200).json(data);
               
            } else {
                return res.status(501).json({message: 'Invalid Credentials'})
            }
        }
        else {
            return res.status(501).json({message: 'Admin email is not registred.'})
        }
    });
    promise.catch(function(err){
       return res.status(501).json({message: 'Some internal '}) 
    })
})

router.getAdmin = (verifyToken, function(req,res,next){
   return res.status(200).json(decodedToken.username);
})
var decodedToken ='';
function verifyToken(req,res,next){
    let token = req.query.token;
    jwt.verify(token,'secret', function(err, tokendata){
        if(err){
            return res.status(400).json({message: 'Unauthorized request'});
        }
        if(tokendata){
            decodedToken = tokendata;
            next();

        }
    })
}
module.exports = router;

