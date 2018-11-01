var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function Service() {};

Service.prototype.webhook = function(log){
    process.env.u
    log.timestamp = new Date();
    MongoClient.connect(url, function(err, mongoclient){
        if(err == null) {
            const db = mongoclient.db('logs');
            db.collection('webhook').insertOne(log, function(err, result){
                if (err) {
                    //res.json(err);
                } else {
                    console.log('Registro de log webhook ok')
                }
                mongoclient.close();
            });
        } else {
            console.log(err);
        }
    });
}

Service.prototype.autenticador = function(log){
    log.timestamp = new Date();
    MongoClient.connect(url, function(err, mongoclient){

        const db = mongoclient.db("logs");
        db.collection("autenticador").insertOne(log, function(err, result){
            if(err){
                console.log('Erro ao tentar inserir o autenticador');
            } else {
                console.log('Registro de log autenticador ok');
            }
            mongoclient.close();
        });
    });
}

Service.prototype.sysbot = function(log){
    log.timestamp = new Date();
    MongoClient.connect(url, function(err, mongoclient){
        const db = mongoclient.db('logs');

        db.collection('sysbot').insertOne(log, function(err, result){
            if(err){
                //res.json(err);
            } else {
                console.log('Registro de log sysbot ok')
            }
            mongoclient.close();
        });
    });
}

Service.prototype.centralapi = function(log){
    log.timestamp = new Date();
    MongoClient.connect(url , function(err, mongoclient){

        const db = mongoclient.db('logs')
        db.collection('centralapi').insertOne(log, function (err, result){
            if(err){
                //res.json(err);
            } else {
                console.log('Registro de log centralapi ok')
            }
            mongoclient.close();
        });
    });
}

Service.prototype.dashboard = function(log){
    log.timestamp = new Date();


    MongoClient.connect(url, function(err, mongoclient){
        const db = mongoclient.db("logs");
        db.collection('dashboard').insertOne(log, function(err, result){
            if(err){
                //res.json(err);
            } else {
                console.log('Registro de log dashboard ok')
            }
            mongoclient.close();
        });
    });
}

module.exports = new Service();