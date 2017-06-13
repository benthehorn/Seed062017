'use strict';

import http from 'http';

let NG_PREFIX = ")]}'\n";

// If we are in test environment remove the NG_PREFIX as it breaks supertest module.
if (process.env.NODE_ENV === 'test') {
  NG_PREFIX = '';
}

http.ServerResponse.prototype.ngJSON = function (obj) {
  // settings
  const app = this.app;
  const replacer = app.get('json replacer');
  const spaces = app.get('json spaces');
  const body = JSON.stringify(obj, replacer, spaces);

  // content-type
  if (!this.get('Content-Type')) {
    this.set('Content-Type', 'application/json');
  }

  // Add the prefix
  return this.send(NG_PREFIX + body);
};
