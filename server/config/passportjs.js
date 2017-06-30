'use strict';

import passport from 'passport';
import localStrategy from './strategies/local';
import * as UserController from '../models/user';

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
  return null;
});

passport.deserializeUser((user, done) => {
  done(null, user);
});