'use strict';
var utility = require('./utility');
var steamService = require('../services/steam');

// models
var PlayerAchievementsModel = require('../models/player-achievements.model');

module.exports.getPlayerAchievements = function*(steamid, appid, username) {
    // check the database first
    var result = yield PlayerAchievementsModel.findOne({ steamid: steamid }).exec();

    if (!result) {
        var gameAchievements = yield steamService.getSchemaForGame(appid);
        var playerAchievements = yield steamService.getPlayerAchievements(steamid, appid);

        // combine game stats and player's achievements. only need the achieved value
        gameAchievements.availableGameStats.achievements.forEach(item => {
            item.achieved = playerAchievements.achievements.filter(x => {
                return x.apiname === item.name;
            })[0].achieved;
        });

        result = yield PlayerAchievementsModel.create({
            username: username,
            steamid: steamid,
            achievements: gameAchievements
        });
    }

    return result;
};