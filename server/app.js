'use strict';

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import './modules/ngJSON';
import * as connector from './connector/connector';
import mongoRoutes from './routes/mongoRoutes';

const app = express();



connector.getdb('benseed')
    .then(dbin => {
     console.log('connected');
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public/img/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// for serving the angular application statically
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/app')));


app.use('/api/mongo', mongoRoutes);

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
