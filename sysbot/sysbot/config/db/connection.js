var mongodb = require('mongodb');
var db = new mongodb.Db(
    'sysbot_chat',
    new mongodb.Server('localhost', 27017, {}),
    {}
);   

module.exports = db
