'use strict';

import * as LocalStrategy from 'passport-local';
import UserController from '../../models/user';

export default new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  console.log('Password :', password);
  console.log('Email :', email);
  let user;
  UserController.findOne({
    email: email
  }).then(foundUser => {
    console.log('Found: ', foundUser);
    if (!foundUser) {
      return false;
    }

    user = foundUser;
    return user.validPassword(password, user.password);
  }).then(isMatch => {
    if (!isMatch) {
      done(null, false);
    } else {
      done(null, user);
    }

    return null;
  })
  .catch(reason => {
    done(reason);
    return null;
  });
});
