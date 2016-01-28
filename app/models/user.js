var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  "type": {
    "type": String,
    "default": "user"
  },
  "attributes": {
    "name": String,
    "password": String,
    "email": String,
    "created": Date,
    "updated": Date,
    "avatarUrl": String,
    "isMember": Boolean,
    "isVerified": Boolean,
    "isAdmin": Boolean
  }
});

module.exports = mongoose.model('User', UserSchema);
