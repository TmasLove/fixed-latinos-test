const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');


const UserModel = require('../models/user-model');


const router = express.Router();

//signup
router.get('/signup', (req, res, next) => {
  res.render('auth-views/signup-view.ejs');
});



router.post('/signup', (req, res, next) => {
  if (req.body.signupUserName === '' || req.body.signupPassword === '') {
    res.locals.messageForDumbUsers = 'Please provide both username and password';
    res.render('auth-views/signup-view');
    return;
  }
  UserModel.findOne({
      username: req.body.signupUserName
    },
    (err, userFromDb) => {
      if (userFromDb) {
        res.locals.messageForDumbUsers = "Sorry but that username is taken.";
      }
    }
  );

  const salt = bcrypt.genSaltSync(10);
  const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);


  const theUser = new UserModel({
    username: req.body.signupUserName,
    encryptedPassword: scrambledPassword
  });

  console.log(theUser);
  console.log('fails after the user');

  theUser.save((err) => {
console.log('fails before if  in the save');
    if (err) {
      console.log('5');
      next(err);
      return;
    }
    res.redirect('/login');
  });

});

//END REGISTRATION--------------------------------------------------------------



//LOG IN------------------------------------------------------------------------




router.get('/login', (req, res, next) => {
  res.render('auth-views/login-view.ejs');
});

router.post('/login', passport.authenticate(
  'local', //1st argument -> name of the strategy
  //                            (determined by the strategy's npm package)
  { //2nd argument -> settings object
    successRedirect: '/members', //"successRedirect" (where to go if login worked)
    failureRedirect: '/login' //"failureRedirect" (where to go if login failed)
  }
));

// This is different because passport.authenticate() redirects
// (APIs normally shouldn't redirect)
router.post('/login', (req, res, next) => {
    const authenticateFunction =
      passport.authenticate('local', (err, theUser, extraInfo) => {
          // Errors prevented us from deciding if login was a success or failure
          if (err) {
            res.status(500).json({ message: 'Unknown login error 💩' });
            return;
          }

          // Login failed for sure if "theUser" is empty
          if (!theUser) {
            // "extraInfo" contains feedback messages from LocalStrategy
            res.status(401).json(extraInfo);
            return;
          }

          // Login successful, save them in the session.
          req.login(theUser, (err) => {
              if (err) {
                res.status(500).json({ message: 'Session save error 💩' });
                return;
              }

              // Clear the encryptedPassword before sending
              // (not from the database, just from the object)
              theUser.encryptedPassword = undefined;
              console.log("Logged in");

              // Everything worked! Send the user's information to the client.
              res.status(200).json(theUser);
          });
      });

    authenticateFunction(req, res, next);
});








//END LOGIN --------------------------------------------------------------------
router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success! 🐫' });
});


router.get('/checklogin', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: 'Nobody logged in. 🥒' });
      return;
    }

    // Clear the encryptedPassword before sending
    // (not from the database, just from the object)
    req.user.encryptedPassword = undefined;

    res.status(200).json(req.user);
});



module.exports = router;
