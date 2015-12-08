/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
  return superagent(app.listen());
}

describe('Routes', function() {
  describe('GET /', function() {
    it('should return 200', function(done) {
      request()
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /summary/boatski', function() {
    it('should return the value boatski', function(done) {
      request()
      .get('/summary/boatski')
      .expect(200, done);
    });
  });

  describe('GET /notfound', function() {
    it('should return 404', function(done) {
      request()
        .get('/notfound')
        .expect(404, done);
    });
  });
});
