var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sysbot_chat";
var ObjectId = require('mongodb');
//var ConversationModel = require('../db/models/Conversation');
//var IntenntsModel = require('../db/models/Intents');
var ChatModel = require('../db/models/chat');

function setClassifica() { }

setClassifica.prototype.Add = function (req, res, next) {
    var time = moment(req.body.meta.timestamp);
    var user = req.body.meta.iduser;
    var classificacao = req.params.classifica;
    var idInteration = req.body.meta.idInteration;
    var conversation_id = req.body.meta.conversation_id;

    var myquery = { "iduser": user, "conversation_id": conversation_id};
    ChatModel.findOne(myquery, function (err, chat) {
         if (err) {
            return console.log(err);
        }

        var interations = chat.interations;

        interations.filter(function(valor, index) {
            console.log(valor.id + ' ' + idInteration);
            if(valor.id == idInteration){
                console.log('entrou');
                var interacoes = chat.interations;
                valor.classificacao = classificacao;
                interacoes.splice(index, 1);
                interacoes.push(valor);
                console.log(interacoes);
                ChatModel.update({conversation_id: valor.conversation_id}, {$set: {'interations': interacoes}}, function (err, updatedTank) {
                    if (err){
                        console.log(err);
                    }
                    res.send(updatedTank);
                });

            }
        });

  });

//    ConversationModel.findOne(myquery, function(err, res){
//        if(err){
//           return console.log(err);
//        }
//        res.set({status_conversation: aval});
//        res.save(function(err, update){
//            if(err){
//                return handle(err);
//           }
//            res.send(update);
//        })
//    });
//IntenntsModel.findAndUpdate({ "iduser": user, "dateCreated": time },
//     { $set: { "avaliacao": aval } },
//     { new: true }, function(err, res){
//     console.log(res);
// });
//next();
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//
// db.collection('intents_analitics').findOneAndUpdate(myquery, newvalues, {returnOriginal: false});
//
// });

}
module.exports = new setClassifica()