'use strict';
var config = require('../config/config');
var request = require('koa-request');

var key = (config.steamKey) ? config.steamKey : process.env.STEAM_KEY;

module.exports = {
  getBadges: function * (id, callback) {
    var options = {
      url: 'https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=' + key + '&format=json&steamid=' + id
    };

    var result = yield request(options);
    return JSON.parse(result.body).response;
  },
  getOwnedGames: function * (id, callback) {
    var options = {
      url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key + '&steamid=' + id + '&format=json&include_appinfo=1'
    };

    var result = yield request(options);
    return JSON.parse(result.body).response;
  },
  getPlayerAchievements: function * (steam, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + key + '&format=json&steamid=' + steam.steamid + '&appid=' + steam.appid
    };

    return yield execute(options);
  },
  getPlayerBans: function * (id, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + key + '&format=json&steamids=' + id
    };

    var result = yield request(options);
    return JSON.parse(result.body).players[0]; // we should never reach this with an invalid id
  },
  getPlayerSummaries: function * (id, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + key + '&format=json&steamids=' + id
    };

    var result = yield request(options);
    return JSON.parse(result.body).response.players[0]; // we should never reach this with an invalid id
  },
  getSteamLevel: function * (id, callback) {
    var options = {
      url: 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + key + '&format=json&steamid=' + id
    };

    return yield execute(options);
  },
  resolveVanityUrl: function * (id, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + key + '&format=json&vanityurl=' + id + '&url_type=1'
    };

    var result = yield request(options);
    return JSON.parse(result.body).response;
  }
};

var execute = function * (options) {
  var result = yield request(options);
  return JSON.parse(result.body);
};
