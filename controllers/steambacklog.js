'use strict';
// var parse = require('co-body');
// var monk = require('monk');
// var wrap = require('co-monk');
// var co = require('co');

module.exports.home = function * home(next) {
  if ('GET' != this.method) return yield next;
  this.body = "Hello world!";
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
