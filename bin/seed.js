const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fixed-latinos', {useMongoClient: true});


const User = require('../models/user-model.js');


const myUserArray = [
  {
    username: 'admin',
    password: 'admin'

  },
  {
    username: 'garry',
    password: 'elcuco'
  },
  {
    username: 'david',
    password: 'metal'
  },
  {
    username: 'panda',
    password: 'modafocka'
  },
  {
    username: 'gene',
    password: 'pentalon'
  },
  {
    username: 'luis',
    password: 'nolegs'
  }

];

myUserArray.forEach((username) => {
  User.save(myUserSchema);
   });
