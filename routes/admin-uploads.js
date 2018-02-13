const express = require('express');
const router  = express.Router();



//generate memes route
router.get('/admin', (req, res, next) => {
  if(req.user) {
    res.render('admin.ejs');
  }
  else {
    res.redirect('/login');
  }
});






module.exports = router;
