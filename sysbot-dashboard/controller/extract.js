function extract() { }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

extract.prototype.chat = function (req, res, next) {
    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        db.collection("chat").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem chat')
            }
            else {
                for(i=0; result.length > i; i++){
                    result[i].iduser = '-'
                }
        
                req.body.chat = result
            }
            db.close();
            next()
        });
    }); 
}

extract.prototype.autenticador = function (req, res, next) {
    MongoClient.connect(url + 'logs', function (err, db) {
        if (err) throw err;
        db.collection("autenticador").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem log autenticador')
            }
            else {
                req.body.autenticador = result
            }
            db.close();
            next()
        });
    }); 
}

extract.prototype.centralapi = function (req, res, next) {
    MongoClient.connect(url + 'logs', function (err, db) {
        if (err) throw err;
        db.collection("centralapi").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem log centralapi')
            }
            else {
                req.body.centralapi = result
            }
            db.close();
            next()
        });
    }); 
}

extract.prototype.dashboard = function (req, res, next) {
    MongoClient.connect(url + 'logs', function (err, db) {
        if (err) throw err;
        db.collection("dashboard").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem log dashboard')
            }
            else {
                req.body.dashboard = result
            }
            db.close();
            next()
        });
    }); 
}

extract.prototype.sysbot = function (req, res, next) {
    MongoClient.connect(url + 'logs', function (err, db) {
        if (err) throw err;
        db.collection("sysbot").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem log sysbot')
            }
            else {
                req.body.sysbot = result
            }
            db.close();
            next()
        });
    }); 
}

extract.prototype.webhook = function (req, res, next) {
    MongoClient.connect(url + 'logs', function (err, db) {
        if (err) throw err;
        db.collection("webhook").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                console.log('sem log webhook')
            }
            else {
                req.body.webhook = result
            }
            db.close();
            next()
        });
    }); 
}

module.exports = new extract();