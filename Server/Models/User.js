var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    ImageUrl: String,
    CreateDate: Date
});

module.exports = mongoose.model('User', UserSchema);