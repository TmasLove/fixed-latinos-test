const express = require('express');
const router = express.Router();
const models = require('../models/pg-post-model.js');


router.post('/photo-gallery', (req, res, next) => {
    const myPost = new models ({
      username: req.user.username,
      image_path: req.body.imageData
    });

    myPost.save((err) => {

      if (err) {
        next(err);
        return;
      }

      res.redirect('/login');
    });

});



module.exports = router;
