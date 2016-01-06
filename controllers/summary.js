'use strict';
// controlers
var utility = require('./utility');
var co = require('co');

// models
var PlayerSummaryModel = require('../models/player-summary.model');

// services
var steamService = require('../services/steam');

module.exports.getPlayerSummary = function*(steamid, username) {
  // check the database first
  var result = yield PlayerSummaryModel.findOne({ steamid: steamid }).exec();

  // if no result, create a new one
  if (!result) {
    result = yield PlayerSummaryModel.create({
      username: username,
      steamid: steamid,
      summary: {
        playerSummary: yield steamService.getPlayerSummaries(steamid),
        playerBans: yield steamService.getPlayerBans(steamid),
        playerBadges: yield steamService.getBadges(steamid),
        playerRecentGames: yield steamService.getRecentlyPlayedGames(steamid),
        playerFriendsList: yield steamService.getFriendsList(steamid)
      }
    });
  }

  // result.summary = yield steamService.getPlayerSummaries(steamid)
  // yield result.save();
  return result;
};
