'use strict';
var steamService = require('../services/steam');
// var parse = require('co-body');
// var monk = require('monk');
// var wrap = require('co-monk');
// var co = require('co');

module.exports.home = function * home(next) {
  if ('GET' != this.method) return yield next;

  this.body = "Hello world!";
};

/*
Gets the Steam user's player summary.
*/
module.exports.summary = function * summary(id, next) {
  if ('GET' != this.method) return yield next;

  this.body = yield steamService.resolveVanityUrl(id);
};

module.exports.head = function *(){
  return;
};

module.exports.options = function *() {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function *() {
  this.body = "Smart! But you can't trace.";
};
