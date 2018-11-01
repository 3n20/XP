function Conversations() { }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

Conversations.prototype.getByConversationId = function (req, res, next) {
    var iduser = req.params.iduser
    var idsubnetwork = req.params.idsubnetwork
    var conversation_id = req.params.conversation_id

    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        var query = { "iduser": iduser,"idsubnetwork": idsubnetwork,"conversation_id": conversation_id };
        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) throw err;
            else{
                console.log(result)
                req.body.result = result
            }
            db.close();
            next()
        });
    });
}

Conversations.prototype.getTopIntencoes = function (req, res, next) {
    var dateQuery = req.query.dateQuery;
    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        db.collection("chat").aggregate([
            {
                $match: {
                    "dt_created" : {
                        $gte : new Date(dateQuery)
                    },
                    "intents.intent" : { $ne: null }
                }
            } ,
            {
                $group: {
                    "_id": "$intents",
                    "totalEntrada": {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalEntrada: -1
                }
            }
        ]).toArray(function (err, result) {
            console.log(result);

            if (err) throw err;
            else{
                console.log(result)
                req.body.result = result
            }
            db.close();
            next()
        });
    });
}

Conversations.prototype.getTopEntities = function (req, res, next) {
    var dateQuery = req.query.dateQuery;
    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        db.collection("chat").aggregate([
            { $match: {"dt_created" : {$gte : new Date(dateQuery)}, "entities" : {$ne: null}}} ,
            { $group: { "_id": "$entities", totalEntrada: {$sum: 1} }},
            { $sort: {totalEntrada: -1}}
        ]).toArray(function (err, result) {
            console.log(result);

            if (err) throw err;
            else{
                console.log(result)
                req.body.result = result
            }
            db.close();
            next()
        });
    });
}


Conversations.prototype.getByDay = function (req, res, next) {

    /* var inicio = moment();
    var fim = moment()

    inicio.format("YYYY-MM-DDT00:00:00.000")
    fim.format("YYYY-MM-DDT23:59:59.999") */

    var hoje = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()


    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        var query = {"timestamp":{$gte: new Date(hoje)}, "status_conversation":"inicio" }
        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) throw err;
            else{
                result = filterByDay(result)
                req.body.day = result
            }
            db.close();
            next()
        });
    });
}

Conversations.prototype.getByWeek = function (req, res, next) {

    var hoje = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()+1)
    var semana = new Date(hoje).setDate(new Date().getDate() - 6)

    var dia = new Date(semana).getDate()
    var mes = new Date(semana).getMonth()+1
    var ano = new Date(semana).getFullYear()

    semana = ano+'-'+mes+'-'+dia


    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        var query = {"timestamp":{$gte: new Date(semana)},"timestamp":{$lte: new Date(hoje)}, "status_conversation":"inicio"};
        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) throw err;
            else{
                console.log(result)
                result = filterByWeek(result)
                req.body.week = result
            }
            db.close();
            next()
        });
    });
}

Conversations.prototype.getByMonth = function (req, res, next) {

    var hoje = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()+1)

    var mesAnteior = new Date(hoje).setDate(new Date().getDate() - 31)

    var dia = new Date(mesAnteior).getDate()
    var mes = new Date(mesAnteior).getMonth()+1
    var ano = new Date(mesAnteior).getFullYear()

    mesAnteior = ano+'-'+mes+'-'+dia


    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        var query = {"timestamp":{$gte: new Date(mesAnteior)},"timestamp":{$lte: new Date(hoje)}, "status_conversation":"inicio"};
        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) throw err;
            else{
                result = filterByMonth(result)
                req.body.month = result
            }
            db.close();
            next()
        });
    });
}

Conversations.prototype.getByYear = function (req, res, next) {

    var hoje = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()+1)

    var anoAnteior = new Date(hoje).setDate(new Date().getDate() - 365)

    var dia = new Date(anoAnteior).getDate()
    var mes = new Date(anoAnteior).getMonth()+1
    var ano = new Date(anoAnteior).getFullYear()

    anoAnteior = ano+'-'+mes+'-'+dia

    MongoClient.connect(url + 'sysbot_chat', function (err, db) {
        if (err) throw err;
        var query = {"timestamp":{$gte: new Date(anoAnteior)},"timestamp":{$lte: new Date(hoje)}, "status_conversation":"inicio"};
        db.collection("chat").find(query).toArray(function (err, result) {
            if (err) throw err;
            else{
                result = filterByYear(result)
                req.body.year = result
            }
            db.close();
            next()
        });
    });
}
module.exports = new Conversations();