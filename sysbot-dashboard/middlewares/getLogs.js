var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/logs";

function getLogs() { }

getLogs.prototype.autenticador = function(req, body, next){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("autenticador").find({}).sort({timestamp: -1}).toArray(function (err, result) {
            if (err) throw err;
            else{
                req.body.autenticador = result;
            }
            next()
            db.close()
        });
    });
}

getLogs.prototype.centralapi = function(req, body, next){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("centralapi").find({}).sort({timestamp: -1}).toArray(function (err, result) {
            if (err) throw err;
            else{
                req.body.centralapi = result;
            }
            next()
            db.close()
        });
    });
}

getLogs.prototype.dashboard = function(req, body, next){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("dashboard").find({}).sort({timestamp: -1}).toArray(function (err, result) {
            if (err) throw err;
            else{
                req.body.dashboard = result;
            }
            next()
            db.close()
        });
    });
}

getLogs.prototype.sysbot = function(req, body, next){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("sysbot").find({}).sort({timestamp: -1}).toArray(function (err, result) {
            if (err) throw err;
            else{
                req.body.sysbot = result;
            }
            next()
            db.close()
        });
    });
}

getLogs.prototype.webhook = function(req, body, next){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("webhook").find({}).sort({timestamp: -1}).toArray(function (err, result) {
            if (err) throw err;
            else{
                req.body.webhook = result;
            }
            next()
            db.close()
        });
    });
}


module.exports = new getLogs()