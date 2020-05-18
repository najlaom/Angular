const Post = require ('../model/post_model.js'); // inclut le schéma de 
const router = require('express').Router();
const cors = require('cors');
router.use(cors());

router.addPost = (req, res, next) => {
       const post = new Post({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
       })
       post.save()
       .then(() => {
            res.send('post added successfully');
       }).catch(err => {
            res.status(400).send(err);
       })
 }
 router.showPost = (req, res, next) => {
    Post.find() //fetches all the posts
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}
router.singlePost = (req, res, next) => {
    Post.findById(req.params.id) //filters the posts by Id
       .then(result => {
           res.send(result);
       }).catch(err => {
           res.status(400).send(err);
       })
}

router.updatePost = (req, res) => {
    var id = req.params.id;
    Post.update({_id: id}, req.body)
    .then(post=> {
        if(!post) res.json({success :false, result: "post does not exist"})
        
        res.json(post)
    })
    .catch(err => {
        res.json({ success: false, result: err})
    })
};
router.deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
      .then(()=>{
          res.send('post deleted');
      })
      .catch(err => res.status(400).send(err));
};
module.exports = router;