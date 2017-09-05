const passport = require('passport');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model.js');




passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
});


passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,
    (err, userFromDb) => {
      if (err) {
        return;
      }
      next(null, userFromDb);
    }
  );
});


// STRATEGIES -----------------------
//        the different ways we can log into our app
// passport-local (log in with username and password from a form)

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'loginUsername',
    passwordField: 'loginPassword'
  },
  (formUsername, formPassword, next) => {

    UserModel.findOne(
      {username: formUsername},
      (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }
        //check if userFromDb is empty
        if(userFromDb === null) {
          // In passport, if you call next() with "false" in the 2nd position,
          // that means LOGIN FAILED.
          next(null, false);
          return;
        }
        // #2 If there is a user with that username, is the PASSWORD correct?
        if(bcrypt.compareSync(formPassword, userFromDb.encryptedPassword)=== false) {
        //in passport, if you call next() with "false" in 2nd position,
        // that means LOGIN FAILED
          next(null, false);
          return;
        }
        next(null, userFromDb);
      }
    );
  })
);
