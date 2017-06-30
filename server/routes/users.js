'use strict';

import express from 'express';
import auth from '../modules/auth';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  let userName = req.body.email;
  console.log('password :', req.body.password);
  console.log('User ', req.body.email);
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (user) {
      res.json(null);
      return;
    } else {
      var newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
      });
      newUser.save((err, user) => {
        req.login(user, err => {
          if (err) {
            res.status(420).ngJSON({
              message: 'Your user was created, but an error happened in auto-logging you in'
            });
          } else {

            res.status(201).ngJSON({ message: 'Successfully created new User.' });
          }
        });
      });
    }
  });
});

export default router;
