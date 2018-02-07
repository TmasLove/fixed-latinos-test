const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fixed-latinos-test');

// mongoose.connect('mongodb://heroku_v1bzt6xz:nnqqhuba0b6unvqmujj5bt58eu@ds125588.mlab.com:25588/heroku_v1bzt6xz');


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
