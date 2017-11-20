const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema (
  {     //1st argument -> structure object
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    //SIGN UP/LOG IN FORM users --------
    encryptedPassword: {
      type: String,
      required: true
    },
  },
  {     // 2nd argument -> additional settings
    timestamps: true
        //timestamps creates two additional fields: "createdAt" & "updatedAt"
  }
);

const UserModel = mongoose.model('User', myUserSchema);

module.exports = UserModel;
