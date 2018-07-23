const express = require('express');
const router = express.Router();
const Post = require('../models/pg-post-model.js');
const multer = require('multer');
const upload = require('../config/multer.js');


// var uploading = multer({
//   dest: __dirname + './uploads/',
//   limits: {fileSize: 1000000, files:1},
// });




router.get('/photo-gallery', (req, res, next) => {
  Post.find((err, postResults) => {
    if(err) {
      next(err);
      return;
    }
    res.render('photo-gallery.ejs', {
      postsAndStuff: postResults
    });
  });
});


router.get('/feed', (req, res, next) => {

  Post.find((err, postResults) => {
    if(err) {
      next(err);
      return;
    }


  });
});




router.post('/members', upload.single('file') , (req, res, next) => {
  // console.log('TEST =>>>>>>>');
  // console.log(req.file);
    const myPost = new Post ({
      username: req.user.username,
      // image: `/uploads/${req.file.filename}`,
      image_path: "/"+req.file.path
    });

    // console.log(myPost);

    myPost.save((err) => {
      if (err) {
          res.json(err);
          return;
      }
    //   res.json({
    //   message: 'New Post created!',
    //   id: myPost._id
    // });

    console.log(`New post created: ${myPost}`);
    res.redirect('/login');
    });
});






module.exports = router;
