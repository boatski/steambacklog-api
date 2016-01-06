// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gamesSchema = new Schema({
  username: String,
  steamid: String,
  games: Object
});

// the schema is useless so far
// we need to create a model using it
var PlayerGames = mongoose.model('PlayerGames', gamesSchema);

// make this available to our users in our Node applications
module.exports = PlayerGames;
