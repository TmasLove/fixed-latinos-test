const express = require('express');
const router = express.Router();
const Post = require('../models/pg-post-model.js');
const multer = require('multer');
const upload = require('../config/multer.js');


// var uploading = multer({
//   dest: __dirname + './uploads/',
//   limits: {fileSize: 1000000, files:1},
// });


router.post('/members', upload.single('file') , (req, res, next) => {
  console.log('TEST =>>>>>>>');
    const myPost = new Post ({
      username: req.body.username,
      image: `/uploads/${req.file.file}`,
    });

    console.log(myPost);

    myPost.save((err) => {
      if (err) {
          res.json(err);
          return;
      }
      res.json({
      message: 'New Post created!',
      id: myPost._id
    });

      res.redirect('/login');
    });

});



module.exports = router;
