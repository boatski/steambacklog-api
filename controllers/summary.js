'use strict';
var utility = require('./utility');
var steamService = require('../services/steam');

module.exports = {
  getPlayerSummary: function (id) {
    var summary = {
      playerSummary: steamService.getPlayerSummaries(id),
      playerBans: steamService.getPlayerBans(id),
      playerBadges: steamService.getBadges(id),
      playerRecentGames: steamService.getRecentlyPlayedGames(id),
      playerFriendsList: steamService.getFriendsList(id)
    };

    return summary;
  }
};
