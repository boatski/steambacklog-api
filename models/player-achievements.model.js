// grab the things we need
var mongoose = require('mongoose');
var co = require('co');
var Schema = mongoose.Schema;

// create a schema
var achievementSchema = new Schema({
    username: String,
    steamid: String,
    achievements: Object,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
achievementSchema.pre('save', function(done) {

    co.wrap(function*() {
        try {
            // get the current date
            var currentDate = new Date();

            // change the updated_at field to current date
            this.updated_at = currentDate;

            // if created_at doesn't exist, add to that field
            if (!this.created_at)
                this.created_at = currentDate;

            done();
        } catch (err) {
            done(err)
        }
    }).call(this).then(done);
});

// the schema is useless so far
// we need to create a model using it
var PlayerAchievements = mongoose.model('PlayerAchievements', achievementSchema);

// make this available to our users in our Node applications
module.exports = PlayerAchievements;
