var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    club: {type:String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required!'},
    hashed_pwd: {type:String, required:'{PATH} is required!'},
    roles: [String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.role.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'louis');
            User.create({firstName:'Louis',lastName:'Van Gaal', club:'Manchester United', username:'louis', salt: salt, hashed_pwd: hash, roles:'admin'});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'lionel');
            User.create({firstName:'Lionel',lastName:'Messi', club:'Barcelona', username:'lionel', salt: salt, hashed_pwd: hash, roles:'player'});
            salt = encrypt.createSalt();
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;