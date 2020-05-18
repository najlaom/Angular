
const Partner = require('../model/partner_model.js');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('../app');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());


process.env.SECRET_KEY = 'secret';

router.addAdmin = (async (req, res) => {

    const usernameExist = await Partner.findOne({ username: req.body.name });
    if (usernameExist) return res.status(400).send('username already exists ');

    const emailExist = await Partner.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists ');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);



    const partner = new Partner({
        name: req.body.name,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        managerName: req.body.managerName,
        email: req.body.email,
        role: 'partner',
        password: hashPassword,
        status: false

    });
    try {
        const savedAdmin = await partner.save();
        res.send({ partner: partner._id });
    } catch (err) {
        res.status(400).send(err);
    }
});


router.signIn = (req, res, next) => {
    //checks that email is present or not
    let data = {
        id: '',
        managerName: '',
        email: '',
        password: ''
    }
    Partner.findOne({ 'email': req.body.email }, (err, user) => {

        if (!user) res.json(/*{message :'Login failed, user not found'}, */
            console.log("failed...")
        )

        else {


            //if email is present then it will compare password
            // console.log(user)
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) return res.status(400).json({
                    message: 'wrong Password'
                });

                data.id = user._id;
                data.managerName = user.managerName;
                data.email = user.email;
                data.password = user.password;

                //    return res.status(200).json(data);
                res.status(200).send(user)

                console.log(user)
            })
        }
    })
}

/*exports.signUp = (req, res, next) => {
      const partner = new Partner({
           name: req.body.name,
           adress: req.body.adress,
           phoneNumber: req.body.phoneNumber,
           managerName: req.body.managerName,
           email: req.body.email,
           password: bcrypt.hashSync(req.body.password, 6),
      })
      partner.save()
      .then(() => {
           res.send('partner added successfully');
      }).catch(err => {
           res.status(400).send(err);
      })
}*/
router.listPartner = (req, res, next) => {
    Partner.find() //fetches all the posts
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        })
}
router.singlePartner = (req, res, next) => {
    Partner.findById(req.params.id) //filters the posts by Id
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        })
}

router.updatePartner = (req, res) => {
    var id = req.params.id;
    Partner.findOneAndUpdate({ _id: id }, req.body)
        .then(partner => {
            if (!partner) res.json({ success: false, result: "partner does not exist" })

            res.json(partner)
        })
        .catch(err => {
            res.json({ success: false, result: err })
        })
},

    router.deletePartner = (req, res, next) => {
        Partner.findByIdAndRemove(req.params.id)
            .then(() => {
                res.send('Partner deleted');
            })
            .catch(err => res.status(400).send(err));
    };
    module.exports = router;