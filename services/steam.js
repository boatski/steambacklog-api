'use strict';
var config = require('../config/config');
var request = require('koa-request');

var key = (config.steamKey) ? config.steamKey : process.env.STEAM_KEY;

module.exports = {
  getBadges: function(steam, callback) {
    var options = {
      url: 'https://api.steampowered.com/IPlayerService/GetBadges/v1/?key=' + key + '&format=json&steamid=' + steam.steamid
    };

    return yield execute(options);
  },
  getOwnedGames: function(steam, callback) {
    var options = {
      url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key + '&steamid=' + steam.steamid + '&format=json&include_appinfo=1'
    };

    return yield execute(options);
  },
  getPlayerAchievements: function(steam, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=' + key + '&format=json&steamid=' + steam.steamid + '&appid=' + steam.appid
    };

    return yield execute(options);
  },
  getPlayerBans: function(steam, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + key + '&format=json&steamids=' + steam.steamid
    };

    return yield execute(options);
  },
  getPlayerSummaries: function(steam, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=' + key + '&format=json&steamids=' + steam.steamid
    };

    return yield execute(options);
  },
  getSteamLevel: function(steam, callback) {
    var options = {
      url: url = 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=' + key + '&format=json&steamid=' + steam.steamid
    };

    return yield execute(options);
  },
  resolveVanityUrl: function(id, callback) {
    var options = {
      url: 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=' + key + '&format=json&vanityurl=' + id + '&url_type=1'
    };

    return yield execute(options);
  }
};

var execute = function * (options) {
  var result = yield request(options);
  return JSON.parse(result.body);
};
