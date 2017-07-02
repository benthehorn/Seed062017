'use strict';

import chai from 'chai';
let should = chai.should();
let expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
import Promise from 'promise';
import db from '../../server/config/db';
chai.use(chaiAsPromised);
import mongoose from 'mongoose';
import testUsers from '../../testMaterial/users.json';
import User from '../../server/models/user';
import userRoles from '../../server/config/userRoles';


describe('Tests for User Model', () => {

  beforeEach(done => {
    User.remove({}, () =>{
      let inserts = [testUsers[0], testUsers[1]];
      User.create(inserts, (err) => {
        console.log('Test Users Inserted');
        done();
      });
    });
  });

  it('should return TestUser1', done => {
    User.findOne({ userName: 'Test1' })
      .then((user) => {
        user.email.should.equal('Test@Test');
        done();
      });
  });

  it('should return TestUser2 role as admin', done => {
    User.findOne({ userName: 'Test2' })
      .then((user) => {
        user.role.should.equal(userRoles.admin);
        done();
      });
  });
});