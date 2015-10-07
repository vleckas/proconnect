var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost:27017/proconnect',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        db: 'mongodb://heroku_11dn0j7f:h5octpebesnlmjsflrk7l2og3a@ds051953.mongolab.com:51953/heroku_11dn0j7f',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};