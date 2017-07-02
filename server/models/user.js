'use strict';

import mongoose from 'mongoose';
import userRoles from '../config/userRoles';
import bcrypt from 'bcryptjs';
import Promise from 'promise';
import _ from 'lodash';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: userRoles.regular
  }
});

UserSchema.pre('save', function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    if (process.env.NODE_ENV === 'test') {
      salt = bcrypt.genSaltSync(1);
    }

    this.password  = bcrypt.hashSync(this.password, salt);
  }

  next();
});

UserSchema.methods.validPassword = (password, hash) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password,  hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });

};

module.exports = mongoose.model('User', UserSchema);
