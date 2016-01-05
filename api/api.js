'use strict';
var steamService = require('../services/steam');
var main = require('../controllers/main');
var playerGames = require('../controllers/games');
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
    this.body = yield {
      id: id,
      summary: playerSummary.getPlayerSummary(steamid.steamid)
    };
  } else {
    this.body = steamid;
  }
};

/*
Gets the Steam user's owned games.
*/
module.exports.games = function * games(id, next) {
  if ('GET' != this.method) return yield next;

  // resolve the steam name to a steam id if we need to
  var steamid = yield utility.getSteamId(id);

  // if we successfully resolve the url then get the games
  if (steamid.success === 1) {
    this.body = yield {
      id: id,
      games: playerGames.getPlayerGames(steamid.steamid)
    };
  } else {
    this.body = steamid;
  }
};

module.exports.achievements = function * achievements(id, next) {
  if ('GET' != this.method) return yield next;

  // resolve the steam name to a steam id if we need to
  var steamid = yield utility.getSteamId(id);
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
