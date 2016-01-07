'use strict';
// controlers
var utility = require('./utility');
var co = require('co');

// models
var PlayerGamesModel = require('../models/player-games.model');

// services
var steamService = require('../services/steam');

module.exports.getPlayerGames = function*(steamid, username) {
  // check the database first
  var result = yield PlayerGamesModel.findOne({ steamid: steamid }).exec();

  // if no result, create a new one
  if (!result) {
    result = yield PlayerGamesModel.create({
      username: username,
      steamid: steamid,
      games: {
        playerGames: yield steamService.getOwnedGames(steamid)
      }
    });
  }

  // result.summary = yield steamService.getPlayerSummaries(steamid)
  // yield result.save();
  return result;
};
