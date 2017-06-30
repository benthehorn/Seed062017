'use strict';

import express from 'express';
import passport from 'passport';
import auth from '../modules/auth';
const User = require('../models/user');
const router = express.Router();


/**
 * @api {post} /login Login
 * @apiVersion 2.0.0
 * @apiPermission none
 * @apiName authenticate
 * @apiGroup Passport
 *
 * @apiParam {String} email The email - acts as a username.
 * @apiParam {String} password The password for logging in.
 *
 * @apiDescription Used whenever a user logs in via the login-form with email and password.
 *
 * @apiSuccess {Object} User The logged in User.
 * @apiError {String} Body Unauthorized
 */
router.post('/login', passport.authenticate('local'), (req, res) => res.send(req.user));

/**
 * @api {get} /auth Re-authenticating
 * @apiVersion 2.0.0
 * @apiPermission authed
 * @apiName re-authenticate
 * @apiGroup Passport
 *
 * @apiDescription Used whenever a user refresh his browser and there for Angular app.
 * Angular will need to restart and regain the state is was in before the refresh.
 *
 * @apiSuccess {Object} User The logged in User.
 * @apiError {String} Body Unauthorized
 */
router.get('/auth', auth.isAuthed, (req, res) => res.send(req.user));

/**
 * @api {get} /logout Logout
 * @apiVersion 2.0.0
 * @apiPermission none
 * @apiName logout
 * @apiGroup Passport
 *
 * @apiDescription Used for logging out, Facebook or not.
 *
 * @apiSuccess {String} message Successfully logged out!
 */
router.get('/logout', (req, res) => {
  req.logout();
  return res.ngJSON({ message: 'Successfully logged out!'});
});


export default router;