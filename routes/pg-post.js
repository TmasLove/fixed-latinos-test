const express = require('express');
const router = express.Router();
const models = require('../models/pg-post-model.js');


router.post('/film', (req, res, next) => {
    const myPost = new models ({
      username: req.user.username,
      image_path: req.body.imageData
    });

    myPost.save((err) => {

      if (err) {
        next(err);
        return;
      }

      res.redirect('/film');
    });

});



module.exports = router;
