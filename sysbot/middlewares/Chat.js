function Chat(){};
let async          = require('async');
let db             = require('../config/db/connection')
let Log            = require('../controllers/Log');
let uuidV1         = require('uuid/v1');
let url            = "mongodb://localhost:27017/";
let MongoClient    = require('mongodb').MongoClient;
let Conversation   = require('../model/Conversation');
let Intents        = require('../model/Intents');
let Entities       = require('../model/Entities');
let ChatInteration = require('../model/ChatInteration');
let request        = require('request');
let LogsController = require('../controllers/Log');
let log            = new Object();
Chat.prototype.Add = async function(req, res, next){
    let date       = new Date();
    let uboundEl   = req.body.response.output.nodes_visited.length - 1;
    let dados      = {
        "idsubnetwork": req.body.meta.idsubnetwork,
        "idagent": req.body.idagent,
        "iduser": req.body.meta.iduser,
        "from": "webaap",
        "to": "nlp",
        "conversation_id": req.body.response.context.conversation_id,
        "timestamp": date,
        "interations": [{
            "id": uuidV1(),
            "input": req.body.response.input.text,
            "output": req.body.response.output.text,
            "intents": req.body.response.intents,
            "idnode": req.body.response.output.nodes_visited[uboundEl],
            "aval": req.body.response.output.aval ? true : false,
            "conversation_id": req.body.response.context.conversation_id,
            "dt_created": new Date(),
            "classificacao": "NAO_AVALIADO"

        }],
        "dt_created": date,
        "status_conversation":req.body.status,
        "avaliacao_geral":"0"
    };
    req.body.meta.timestamp = dados.timestamp;
    MongoClient.connect(url + 'sysbot_chat', function(err, mongoclient){
        mongoclient.collection('conversation_analitics').findOne({"conversation_id": req.body.response.context.conversation_id, "status_conversation": {$ne : "final"} }, function (err, result) {
            if(err){
                //Log.Add('error', req.originalUrl, 'chat', 'Erro ao pesquisar interação na base: ' + err, req.ip, {body: req.body}, false);
                log = {tipo: 'erro', mensagem: err + 'Erro ao pesquisar interação na base: ' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log);            
            }else{
                if(result == null){
                    save(req);
                }else{
                    update(req, result);
                }
            }
        });
    });
    MongoClient.connect(url + 'sysbot_chat', function (err, mongoclient){
        mongoclient.collection('chat').findOne({"conversation_id": req.body.response.context.conversation_id, "status_conversation": {$ne : "final"} }, function(err, result){
            if(err){
                //Log.Add('error', req.originalUrl, 'chat', 'Erro ao pesquisar interação na base: '+err, req.ip, { body: req.body }, false);
                log = {tipo: 'erro', mensagem: err + 'Erro ao pesquisar interação na base: ' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log);    
            }else{
                if(!result){
                    MongoClient.connect(url, function (err, mongoclient) {
                        if(err == null){
                            const db = mongoclient.db('sysbot_chat');
                            db.collection('chat').insertOne(dados, function(err, result){
                                if (err) {
                                    //Log.Add('error', req.originalUrl, 'chat', 'Erro ao gravar interação na base: '+err, req.ip, { body: req.body }, false);
                                    log = {tipo: 'erro', mensagem: err + 'Erro ao gravar interação na base: ' + req.body.meta.timestamp, body: req.body};
                                    LogsController.salvaLogNaBase(log);   
                                }else{
                                    //console.log('chat ok');
                                    if(dados.interations[0].aval) {
                                        req.body.meta.idInteration = dados.interations[0].id;
                                    }
                                    //Log.Add('info', req.originalUrl, 'chat', 'Interação gravada na base com sucesso', req.ip, { body: req.body }, false);
                                    log = {tipo: 'aviso', mensagem: 'Interação gravada na base com sucesso na base: ' + req.body.meta.timestamp, body: req.body};
                                    LogsController.salvaLogNaBase(log);                                  
                                }
                                mongoclient.close();
                                next();
                            });
                        }else{
                            log = {tipo: 'erro', mensagem: err + 'log de erro ' + req.body.meta.timestamp, body: req.body};
                            LogsController.salvaLogNaBase(log);  
                        }
                    });
                }else{
                    let chat = {
                        "id": uuidV1(),
                        "input": req.body.response.input.text,
                        "output": req.body.response.output,
                        "intents": req.body.response.intents,
                        "aval": req.body.response.output.aval ? true : false,
                        "idnode": req.body.response.output.nodes_visited[uboundEl],
                        "conversation_id": req.body.response.context.conversation_id,
                        "dt_created": new Date(),
                        "classificacao": "NAO_AVALIADO"
                    };
                    if(dados.interations[0].aval){
                        req.body.meta.idInteration = chat.id;
                    }
                    let chats = result.interations;
                    if(!chats){
                        chats = [];
                    }
                    chats.push(chat);
                    mongoclient.collection('chat').update({_id: result._id}, {$set: {interations: chats}}, function (err, res) {
                        if(err){
                            //Log.Add('error', req.originalUrl, 'chat', 'Erro ao atulizar interação na base: ' + err, req.ip, {body: req.body}, false);
                            log = {tipo: 'erro', mensagem: 'Erro ao atulizar interação na base: ' + req.body.meta.timestamp, body: req.body};
                            LogsController.salvaLogNaBase(log);  
                        }else{
                            next();
                        }
                        mongoclient.close();
                    });
                }
            }
        });
    });
};
async function save(req){
    let conversation = await saveConversation(req);
    let intents      = await saveIntentions(req, conversation);
    await saveEntities(req, intents, conversation);
    let chat         = saveChatInteration(req, conversation, intents);
}
async function update(req, conversation){
    let intents      = await saveIntentions(req, conversation);
    await saveEntities(req, intents, conversation);
    let chat         = saveChatInteration(req, conversation, intents);
}
async function saveConversation(req){
    let conversation = new Conversation({
        "idsubnetwork": req.body.meta.idsubnetwork,
        "idagent": req.body.idagent,
        "iduser": req.body.meta.iduser,
        "from": "webaap",
        "to": "nlp",
        "conversation_id": req.body.response.context.conversation_id,
        "timestamp": new Date(),
        "dt_created": new Date(),
        "status_conversation":req.body.status
    });
    await conversation.save(function(err){
        if(err){
            return console.log(err);
        }
    });
    return conversation;
}
async function saveIntentions(req, conversation){
    if(req.body.response.intents.length > 0){
        let intents = new Intents({
            intents: req.body.response.intents[0].intent,
            confidence: req.body.response.intents[0].confidence,
            conversation: conversation._id,
            user: req.body.meta.iduser,
            aval: req.body.response.output.aval ? req.body.response.output.aval : false,
            dateCreated: new Date()
        });
        await intents.save(function(err){
            if(err){
                return console.log(err);
            }
        });
        return intents;
    }
}
async function saveEntities(req, intents, conversation){
    if(req.body.response.entities && req.body.response.entities.length > 0){
        let entitiesArray = req.body.response.entities ? req.body.response.entities : [];
        entitiesArray.forEach(function(entitie){
            let entities = new Entities({
                entity: entitie.entity,
                confidence: entitie.confidence,
                value: entitie.value,
                dateCreated: new Date(),
                conversation: conversation._id,
                intent: intents._id
            });
            entities.save(function(err){
                if(err){
                    return console.log(err);
                }
            })
        });
    }
}
async function saveChatInteration(req, conversation, intents){
    let entitiesArray   = req.body.response.entities;
    let chatInterations = new ChatInteration({
        input: req.body.response.input.text,
        output: {output: req.body.response.output.text, dateCreated: new Date()},
        dateCreated: new Date(),
        user: req.body.meta.iduser,
        conversation: conversation._id,
        intents: intents,
        entities: entitiesArray
    });
    await chatInterations.save(function(err){
        if(err){return console.log(err);}
    });
    return chatInterations;
}
module.exports = new Chat();