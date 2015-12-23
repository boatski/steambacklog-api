'use strict';
var utility = require('./utility');
var steamService = require('../services/steam');

module.exports = {
  getPlayerAchievements: function (id) {
    var summary = {
      playerAchievements: steamService.getPlayerAchievements(id)
    };

    return summary;
  }
};
