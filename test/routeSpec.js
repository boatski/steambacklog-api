/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
  return superagent(app.listen());
}

describe('Routes', function() {

  describe('GET /summary/boatski', function() {
    it('should return the value boatski', function(done) {
      request()
      .get('/summary/boatski')
      .expect(200, done);
    });
  });

  describe('GET /games/boatski', function() {
    it('should return the games for boatski', function(done) {
      request()
          .get('/summary/boatski')
          .expect(200, done);
    });
  });

  describe('GET /achievements/boatski/620', function() {
    it('should return achievements for a game', function(done) {
      request()
          .get('/summary/boatski')
          .expect(200, done);
    });
  });

  describe('GET /resolve/boatski', function() {
    it('should resolve a steam username into a steam id', function(done) {
      request()
      .get('/resolve/boatski')
      .expect(200, done);
    })
  });

  describe('GET /notfound', function() {
    it('should return 404', function(done) {
      request()
        .get('/notfound')
        .expect(404, done);
    });
  });
});
