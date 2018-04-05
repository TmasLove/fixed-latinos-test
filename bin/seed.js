const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fixed-latinos', {useMongoClient: true});


const theUser = require('../models/user-model.js');


const myUserArray = [
  {
    username: 'admin',
    password: 'admin'

  },
  {
    username: 'garry',
    password: 'fixed'
  },
  {
    username: 'david',
    password: 'fixed'
  },
  {
    username: 'panda',
    password: 'fixed'
  },
  {
    username: 'gene',
    password: 'fixed'
  },
  {
    username: 'luis',
    password: 'fixed'
  }

];

// myUserArray.forEach((username) => {
//   User.save(myUserSchema);
//    });
