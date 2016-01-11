'use strict';
var utility = require('./utility');
var steamService = require('../services/steam');

module.exports.getPlayerAchievements = function*(steamid, appid) {
    var gameAchievements = yield steamService.getSchemaForGame(appid);
    var playerAchievements = yield steamService.getPlayerAchievements(steamid, appid);

    // combine game stats and player's achievements. only need the achieved value
    gameAchievements.availableGameStats.achievements.forEach(item => {
        item.achieved = playerAchievements.achievements.filter(x => {
            return x.apiname === item.name;
        })[0].achieved;
    });

    return gameAchievements;
};
