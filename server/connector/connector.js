'use strict';
import Promise from 'promise';
import mongoose from'mongoose';

var db;

function getdb(databaseName) {
  return new Promise(function (fulfill, reject) {

      var connectionString = 'mongodb://localhost:27017/' + databaseName;
      console.log(connectionString);
      mongoose.Promise = global.Promise;
      mongoose.connect(connectionString, function (err, res) {
          if (err) {

            console.log('error');
            console.log(err);
            reject(err);
          } else {
            db = res;

            console.log('connected to MONGO DB');
            fulfill(db);

          }
        });

    });
}

module.exports = {
    getdb: getdb
  };
