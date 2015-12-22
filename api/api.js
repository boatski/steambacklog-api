'use strict';
var steamService = require('../services/steam');
var main = require('../controllers/main');
var playerSummary = require('../controllers/summary');
var utility = require('../controllers/utility');

/*
Resolves a Steam user's name into a Steam ID.
*/
module.exports.resolve = function * resolve(url, next) {
  if ('GET' != this.method) return yield next;

  this.body = yield utility.getSteamId(url);
};

/*
Gets the Steam user's player summary.
*/
module.exports.summary = function * summary(id, next) {
  if ('GET' != this.method) return yield next;

  // resolve the steam name to a steam id if we need to
  var steamid = yield utility.getSteamId(id);

  // if we successfully resolve the url then get the summary
  if (steamid.success === 1) {
    this.body = yield playerSummary.getPlayerSummary(steamid.steamid);
  } else {
    this.body = steamid;
  }
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
