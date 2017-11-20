const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');


const UserModel = require('../models/user-model');


const router = express.Router();


router.post('/signup', (req, res, next) => {
    // if (!req.body.signupEmail || !req.body.signupPassword) {
    //     // 400 for client errors (user needs to fix something)
        // res.status(400).json({ message: 'Need both email and password 💩' });
        // return;
    // }
    UserModel.findOne(
      { email: req.body.signupEmail },
      (err, userFromDb) => {

          if (err) {
            // 500 for server errors (nothing user can do)
            res.status(500).json({ message: 'Email check went to 💩' });
            return;
          }

          if (userFromDb) {
            // 400 for client errors (user needs to fix something)
            res.status(400).json({ message: 'Email already exists 💩' });
            return;
          }

          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
            fullName: req.body.signupFullName,
            username: req.body.signupUsername,
            encryptedPassword: scrambledPassword
          });

          theUser.save((err) => {
              if (err) {
                res.status(500).json({ message: 'User save went to 💩' });
                return;
              }

              req.login(theUser, (err) => {
                if (err) {
                  res.status(500).json({ message: 'login went to shit' });
                  return;
                }
              });
              theUser.encryptedPassword = undefined;
              res.status(200).json(theUser);

              // Automatically logs them in after the sign up
              // (req.login() is defined by passport)
               // close req.login()
          }); // close theUser.save()
      }
    ); // close UserModel.findOne()
}); // close router.post('/signup', ...


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
