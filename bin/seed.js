const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fixed-latinos-test', {useMongoClient: true});

const theUser = require('../models/user-model.js');


const myUserArray = [
  {
    username: "admin",
    password: "admin"

  }
];

// myUserArray.forEach((username) => {
//   User.save(myUserSchema);
//    });

theUser.create(myUserArray, (err, info, next) => {
  console.log(theUser);

    if (err) {
        throw err;
    }
    mongoose.disconnect();
});
