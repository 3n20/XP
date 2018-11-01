var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sysbot_chat";
var ObjectId = require('mongodb');
var ChatModel = require('../db/models/chat');
function setAvaliaAll() { }
setAvaliaAll.prototype.Add = function (req, res, next) {
    console.log('entrou');
    var iduser = req.body.meta.iduser;
    var conversation_id = req.body.meta.conversation_id;
    var avaliacao_geral = req.body.meta.avaliacao_geral;
    ChatModel.update({conversation_id: conversation_id}, {$set: {"avaliacao_geral": avaliacao_geral}}, function (err, updatedTank) {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
};
module.exports = new setAvaliaAll();