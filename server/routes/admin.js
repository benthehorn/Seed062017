'use strict';

import express from 'express';
import auth from '../modules/auth';
import userRoles from '../config/userRoles';
import User from '../models/user';

const router = express.Router();

/**
 * @api {post} /users Create a new Admin
 * @apiVersion 2.0.0
 * @apiPermission none
 * @apiName createAdmin
 * @apiGroup User
 *
 * @apiDescription Used whenever a new Admin is added.
 * @apiParam {String} userName of the Admin.
 * @apiParam {String} email A valid and unique email address.
 * @apiParam {String} password A password for logging in.
 *
 * @apiSuccess {String} message Successfully created new employer <code>${full name}</code>.
 *
 * @apiError LoginError An error happend in auto-logging in newly created employer.
 * @apiError UniqueConstraintError The <code>email</code> provided already exists.
 * @apiError ValidationError An input validation failed.
 * @apiError DatabaseError An input was invalid.
 */
router.post('/', (req,res) => {
  let userName = req.body.email;
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
        email: req.body.email,
        role: userRoles.admin
      });
      newUser.save((err, user) => {
        req.login(user, err => {
          if (err) {
            res.status(420).ngJSON({
              message: 'Your new Administrator was created, but an error happened in auto-logging you in'
            });
          } else {

            res.status(201).ngJSON({ message: 'Successfully created new Admin.' });
          }
        });
      });
    }
  });
});

export default router;