var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
 name: String
});
var User = mongoose.model('User', UserSchema);
UserSchema.path('name').required(true, 'User name cannot be blank');
