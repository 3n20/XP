var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sysbot_chat";
var ObjectId = require('mongodb');
var ConversationModel = require('../db/models/Conversation');
var IntenntsModel = require('../db/models/Intents');

function setAval() { }

setAval.prototype.Add = function (req, res, next) {
    var time = moment(req.body.meta.timestamp);
    var user = req.body.meta.iduser;
    var aval = req.params.aval;

    var myquery = { "iduser": user, "dateCreated": time.toString() };
    var newvalues = { $set: { "avaliacao": aval } };

    IntenntsModel.findOne(myquery, function (err, intent) {
        if (err) {
            return console.log(err);
        }
        intent.set({ avaliacao: aval });
        intent.save(function (err, updatedTank) {
            if (err) return handleError(err);
            res.send(updatedTank);
        });
    });

    ConversationModel.findOne(myquery, function(err, res){
        if(err){
            return console.log(err);
        }
        res.set({status_conversation: aval});
        res.save(function(err, update){
            if(err){
                return handle(err);
            }
            res.send(update);
        })
    });

    // IntenntsModel.findAndUpdate({ "iduser": user, "dateCreated": time },
    //     { $set: { "avaliacao": aval } },
    //     { new: true }, function(err, res){
    //     console.log(res);
    // });
    //next();


    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //
    //     //db.collection('intents_analitics').findOneAndUpdate(myquery, newvalues, {returnOriginal: false});
    //
    // });

}

module.exports = new setAval()

