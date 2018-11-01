require('mongoose-pagination');
var ObjectId = require('mongoose').Schema.Types.ObjectId;


var IntentsModel = require('../db/models/Intents');
var EntitiesModel = require('../db/models/Entities');
var ConversationModel = require('../db/models/Conversation');
var ChatInteration = require('../db/models/ChatInteration');
var filterByDay = require('../config/filterByDay');
var filterByWeek = require('../config/filterByWeek');
var filterByMonth = require('../config/filterByMonth');
var filterByYear = require('../config/filterByYear');
var confiancaByFilter = require('../config/confidenceByFilter');

function ChatController() { }


ChatController.prototype.findConversationPage = function(req, res, next){
    var filter = {};
    var page = parseInt(req.query.page);
    var pageItens = parseInt(req.query.pageItens);
    var orderBy = parseInt(req.query.orderBy);

    if(req.query.iduser){
        filter.iduser = req.query.iduser;
    }
    if(req.query.dtInicio && req.query.dtFinal && req.query.dtInicio != 'Invalid date' && req.query.dtFinal != 'Invalid date'){
        queryDate += {
            dt_created: {
                $gte: moment(req.query.dtInicio, 'DD/MM/YYYY').format("YYYY-MM-DD 00:00:00.000Z"),
                $lt: moment(req.query.dtFinal, 'DD/MM/YYYY').format("YYYY-MM-DD 23:59:59.999Z")
            }
        }
        filter = queryDate;
    }

    ConversationModel.find(filter, function (err, docs, total) {
        var objectPage = {
            body: docs,
            pagination: {
                total: total,
                page: page,
                pageItens: pageItens
            }
        }
        res.body = objectPage;
        next();
    }).sort({'dt_created': orderBy});
}

ChatController.prototype.findConversationById = function(req, res, next){
    var id = req.query.id;
    ChatInteration.find({conversation: id}).sort([['dateCreated', 1]]).exec(function(err, result){
        res.body = result;
        next();
    });
}


ChatController.prototype.conversationDays = function(req, res, next){
    var dateFrom = moment().format("YYYY-MM-DD 00:00:00.000Z");

    var dateToFull = moment().format("YYYY-MM-DD 23:59:59.999Z");

    ConversationModel.find({dt_created: {
        $gte: dateFrom,
        $lte: dateToFull
    }}, function (err, result) {
        var days = filterByDay(result);
        res.body = days;
        next();
    });
}

ChatController.prototype.conversationWeek = function(req, res, next){
    var dateFrom = moment().subtract(1, 'week').format("YYYY-MM-DD 00:00:00.000Z");

    var dateToFull = moment().format("YYYY-MM-DD 23:59:59.999Z");

    ConversationModel.find({dt_created: {
        $gte: dateFrom,
        $lte: dateToFull
    }}, function (err, result) {
        var week = filterByWeek(result);
        res.body = week;
        next();
    });
}

ChatController.prototype.conversationMonth = function(req, res, next){
    var dateFrom = moment().subtract(1, 'month').format("YYYY-MM-DD 00:00:00.000Z");

    var dateToFull = moment().format("YYYY-MM-DD 23:59:59.999Z");

    ConversationModel.find({dt_created: {
        $gte: dateFrom,
        $lte: dateToFull
    }}, function (err, result) {
        var month = filterByMonth(result);
        res.body = month;
        next();
    });
}

ChatController.prototype.conversationYear = function(req, res, next){
    var dateFrom = moment().subtract(1, 'year').format("YYYY-MM-DD 00:00:00.000Z");

    var dateToFull = moment().format("YYYY-MM-DD 23:59:59.999Z");

    ConversationModel.find({dt_created: {
        $gte: dateFrom,
        $lte: dateToFull
    }}, function (err, result) {
        var year = filterByYear(result);
        res.body = year;
        next();
    });
}

ChatController.prototype.getConfidenceAnalitic = function (req, res, next){
    var tipoPesquisa = req.query.tipoPesquisa;

    if(tipoPesquisa !== "undefined") {
        var dateFrom = moment();

        switch (tipoPesquisa) {
            case "1":
                dateFrom = dateFrom.subtract(0, 'd').format('YYYY-MM-DD 00:00:00.000Z');
                break;
            case "2":
                dateFrom = dateFrom.subtract(1, 'week').format('YYYY-MM-DD 00:00:00.000Z');
                break;
            case "3":
                dateFrom = dateFrom.subtract(1, 'month').format('YYYY-MM-DD 00:00:00.000Z');
                break;
            case "4":
                dateFrom = dateFrom.subtract(1, 'year').format('YYYY-MM-DD 00:00:00.000Z');
                break;
        }
        var dateTo = moment().format('YYYY-MM-DD 23:59:59.999Z');

        IntentsModel.find({
            dateCreated: {
                $gte: new Date(dateFrom),
                $lte: new Date(dateTo)
            }
        }, function (err, result) {
            if(result.length > 0) {
                var confianca = confiancaByFilter(result);
                res.body = confianca;
            } else {
                res.body = null;
            }
            next();
        });
    } else {
        IntentsModel.find({}, function (err, result) {
            var confianca = confiancaByFilter(result);
            res.body = confianca;
            next();
        });
    }
}

ChatController.prototype.getAvalsAnalitic = function (req, res, next) {
    var tipoPesquisa = req.query.tipoPesquisa;

    if(tipoPesquisa !== "undefined") {
        var dateFrom = moment();

        switch (tipoPesquisa) {
            case "1":
                dateFrom = dateFrom.subtract(2, 'd').format('YYYY-MM-DD');
                break;
            case "2":
                dateFrom = dateFrom.subtract(1, 'week').format('YYYY-MM-DD');
                break;
            case "3":
                dateFrom = dateFrom.subtract(1, 'month').format('YYYY-MM-DD');
                break;
            case "4":
                dateFrom = dateFrom.subtract(1, 'year').format('YYYY-MM-DD');
                break;
        }
        var dateTo = moment().format('YYYY-MM-DD');


        IntentsModel.aggregate([
            {
                $match: {
                    dateCreated: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo)
                    },
                    aval: true
                }
            }, {
                $group: {
                    _id: '$avaliacao',
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            if (result.length > 0){
                res.body = result;
            }else{
                res.body = null;
            }
            next();
        });
    } else {
        IntentsModel.aggregate([
            {
                $group: {
                    _id: '$avaliacao',
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            res.body = result;
            next();
        });
    }
}


ChatController.prototype.getIntents = function (req, res, next) {
    var tipoPesquisa = req.query.tipoPesquisa;

    if(tipoPesquisa !== "undefined") {
        var dateFrom = moment(new Date());

        switch (tipoPesquisa) {
            case "1":
                dateFrom = dateFrom.subtract(2, 'd').format('YYYY-MM-DD');
                break;
            case "2":
                dateFrom = dateFrom.subtract(1, 'week').format('YYYY-MM-DD');
                break;
            case "3":
                dateFrom = dateFrom.subtract(1, 'month').format('YYYY-MM-DD');
                break;
            case "4":
                dateFrom = dateFrom.subtract(1, 'year').format('YYYY-MM-DD');
                break;
        }
        var dateTo = moment(new Date()).format('YYYY-MM-DD');

        IntentsModel.aggregate([
            {
                $match: {
                    dateCreated: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo)
                    }
                }
            },{
                $group: {
                    _id: '$intents',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            res.body = result;
            next();
        });
    } else {
        IntentsModel.aggregate([
            {
                $group: {
                    _id: '$intents',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            res.body = result;
            next();
        });
    }
}

ChatController.prototype.findInterations = function(req, res, next){
    var filter = {};
    if(req.query.iduser){
        filter['user'] = req.query.iduser;
    }
    if(req.query.dtInicio && req.query.dtFinal && req.query.dtInicio != 'Invalid date' && req.query.dtFinal != 'Invalid date'){
        filter['dt_created'] = {
            $gte: moment(req.query.dtInicio, 'DD/MM/YYYY').format("YYYY-MM-DD 00:00:00.000Z"),
            $lt: moment(req.query.dtFinal, 'DD/MM/YYYY').format("YYYY-MM-DD 23:59:59.999Z")
        }
    }
    if(req.query.interacao){
        filter['intents.intents'] = req.query.interacao;

    }

    if(req.query.confianca){
        filter['intents.confidence'] = req.query.confianca;
    }


    ChatInteration.find(filter).sort({'dt_created': 1}).exec(function(err, response){
        res.body = response;
        next();
    });
}

async function intents(){
    var intentsArray = [];
    await IntentsModel.find(function(err, response){
        intentsArray = response;
    });
    return intentsArray;
}

async function entities(){
    var response = [];
    var intentsArray = await intents();
    intentsArray.forEach(function(intent){
        EntitiesModel.find({intent: intent._id}, function(err, entities){
            var responseResult = {
                intent: intents,
                entities: entities
            }
            response.push(responseResult);
        });
    });
    return await response;
}

ChatController.prototype.getEntities = function (req, res, next) {
    var tipoPesquisa = req.query.tipoPesquisa;

    if(tipoPesquisa !== "undefined") {
        var dateFrom = moment(new Date());

        switch (tipoPesquisa) {
            case "1":
                dateFrom = dateFrom.subtract(2, 'd').format('YYYY-MM-DD');
                break;
            case "2":
                dateFrom = dateFrom.subtract(1, 'week').format('YYYY-MM-DD');
                break;
            case "3":
                dateFrom = dateFrom.subtract(1, 'month').format('YYYY-MM-DD');
                break;
            case "4":
                dateFrom = dateFrom.subtract(1, 'year').format('YYYY-MM-DD');
                break;
        }
        var dateTo = moment(new Date()).format('YYYY-MM-DD');

        EntitiesModel.aggregate([
            {
                $match: {
                    dateCreated: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo)
                    }
                }
            },{
                $group: {
                    _id: '$entity',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            res.body = result;
            next();
        });
    } else {
        EntitiesModel.aggregate([
            {
                $group: {
                    _id: '$entity',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ], function (err, result) {
            res.body = result;
            next();
        });
    }
}

module.exports = new ChatController();