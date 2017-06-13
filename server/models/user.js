'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  password: String,
  email:String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
