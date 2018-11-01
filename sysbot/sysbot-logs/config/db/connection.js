var mongodb = require('mongodb');
var db = new mongodb.Db(
    'logs',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

module.exports = db
