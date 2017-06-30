'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Promise from 'promise';
import _ from 'lodash';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
  email: String
});

UserSchema.pre('save', function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password  = bcrypt.hashSync(this.password, salt);
  }

  next();
});

UserSchema.methods.validPassword = (password, hash) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password,  hash, (err, isMatch) => {
      if(err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });

};

module.exports = mongoose.model('User', UserSchema);
