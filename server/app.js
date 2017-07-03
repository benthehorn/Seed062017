'use strict';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import './modules/ngJSON';
import mongoose from 'mongoose';
import db from './config/db';
import './config/passportjs';

import mongoRoutes from './routes/mongoRoutes';
import users from './routes/users';
import auths from './routes/auths';
import admin from './routes/admin';

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public/img/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
resave: false,
  saveUninitialized: false,
    secret: 'benplayedthehorn'
}));

app.use(passport.initialize());
app.use(passport.session());

// for serving the angular application statically
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/app')));

app.use('/api', auths);
app.use('/api/mongo', mongoRoutes);
app.use('/api/users', users);
app.use('/api/admin', admin);

// Catch all for sending angular application to handle refreshes doing html5 mode
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
