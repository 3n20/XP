function Context(){};
let MongoClient    = require('mongodb').MongoClient;
let url            = 'mongodb://localhost:27017/sysbot';
let LogsController = require('../controllers/Log');
let log            = new Object();
Context.prototype.getContext = function(req, res, next){
    if(req.body.meta.iduser == '0000000'){
        req.body.context = {};
        next();
    }else{
        MongoClient.connect(url, function(err, db){
            if(err) throw err;
            db.collection("user").findOne({'iduser':req.body.meta.iduser.toString()}, function(err, result){
                if(err){
                    //Log.Add('error', req.originalUrl, 'getContext', 'Erro ao recuperar contexto da base: '+err, req.ip, { body: req.body }, false);
                    log = {tipo: 'erro', mensagem: err + 'Erro ao recuperar contexto da base: ' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                }
                if(!result){
                    log = {tipo: 'aviso', mensagem: 'Resultado não encontrado: ' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                }else if(result.context.value){
                    let context = result.context.value;
                    req.body.context = context
                    req.body.status = 'andamento'
                    //Log.Add('info', req.originalUrl, 'getContext', 'Contexto recuperado com sucesso', req.ip, { body: req.body }, false);
                    log = {tipo: 'aviso', mensagem: 'Contexto recuperado com sucesso: ' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                }else{
                    req.body.context = {}
                    req.body.status = 'inicio'
                    //Log.Add('info', req.originalUrl, 'getContext', 'Contexto inicial gerado com sucesso', req.ip, { body: req.body }, false);
                    log = {tipo: 'aviso', mensagem: 'Contexto inicial gerado com sucesso: ' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                } 
                db.close();
                next();
            });
        });
    }
}
Context.prototype.setContext = function(req, res, next){
    if(req.body.meta.iduser == '0000000'){
        req.body.context = {};
        next();
    }else{
        MongoClient.connect(url, function(err, db){
            if (err) throw err;
            db.collection("user").findOne({"idsubnetwork": req.body.meta.idsubnetwork.toString(), "iduser": req.body.meta.iduser.toString() }, function (err, result) {
                if(result){
                    result.context = {dt_created: new Date(), value: req.body.user.context };
                    var myquery    = {"idsubnetwork": req.body.meta.idsubnetwork.toString(), "iduser": req.body.meta.iduser.toString()};
                    db.collection("user").updateOne(myquery, result, function(err, res) {
                        if(err){
                            //Log.Add('error', req.originalUrl, 'setContext', 'Erro ao atualizar contexto na base de dados', req.ip, { body: req.body }, false);
                            log = {tipo: 'erro', mensagem: err + 'Erro ao atualizar contexto na base de dados ' + req.body.meta.timestamp, body: req.body};
                            LogsController.salvaLogNaBase(log); 
                        }else{
                            //Log.Add('info', req.originalUrl, 'getContext', 'Contexto atualizado com sucesso', req.ip, { body: req.body }, false);
                            log = {tipo: 'aviso', mensagem: 'Contexto atualizado com sucesso ' + req.body.meta.timestamp, body: req.body};
                            LogsController.salvaLogNaBase(log); 
                            delete req.body.user;
                            delete req.body.meta.iduser;
                            delete req.body.meta.idsubnetwork;
                            db.close();
                            next();
                        }                   
                    }); 
                } 
                db.close();
            });
        }); 
    }
}
module.exports = new Context();