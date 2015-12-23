'use strict';
var utility = require('./utility');
var steamService = require('../services/steam');

module.exports = {
  getPlayerGames: function (id) {
    var summary = {
      playerSummary: steamService.getOwnedGames(id)
    };

    return summary;
  }
};
