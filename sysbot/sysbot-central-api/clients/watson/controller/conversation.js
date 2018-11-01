let EnvironmentConfig = require('../../../../sysbot/config/EnvironmentConfig');
let LogsController    = require('../../../../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
function Conversation(){};
let ConversationV1 = require('watson-developer-cloud/conversation/v1');
let conversation = new ConversationV1({
    username: env.conversation_user,
    password: env.conversation_pass,
    version_date: ConversationV1.VERSION_DATE_2017_05_26
});
Conversation.prototype.IntentsList = function(req, res, next){
    conversation.getIntents({
        workspace_id: req.body.idagent
    }, function(err, response){
        var retorno = {};
        if(err){
            retorno.valido = false;
            //Log.Add('error', req.originalUrl, 'Conversation.IntentsList', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.IntentsList', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.IntentsCreate = function (req, res, next) {
    conversation.createIntent({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        description: req.body.description
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('error', req.originalUrl, 'Conversation.IntentsCreate', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.IntentsCreate', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.IntentsDelete = function (req, res, next) {
    conversation.deleteIntent({
        workspace_id: req.body.idagent,
        intent: req.body.intent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('error', req.originalUrl, 'Conversation.IntentsDelete', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.IntentsDelete', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.ExamplesList = function (req, res, next) {
    conversation.getExamples({
        workspace_id: req.body.idagent,
        intent: req.body.intent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('erro', req.originalUrl, 'Conversation.ExamplesList', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }else{
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.ExamplesList', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.ExamplesCreate = function (req, res, next) {
    conversation.createExample({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        text: req.body.text
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('erro', req.originalUrl, 'Conversation.ExamplesCreate', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }
            else {
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.ExamplesCreate', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.ExamplesDelete = function (req, res, next) {
    conversation.deleteExample({
        workspace_id: req.body.idagent,
        intent: req.body.intent,
        text: req.body.text
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('error', req.originalUrl, 'Conversation.ExamplesDelete', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }else{
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.ExamplesDelete', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: err + 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
Conversation.prototype.Log = function (req, res, next) {
    conversation.getLogs({
        workspace_id: req.body.idagent
    }, function (err, response) {
        var retorno = {};
        if (err) {
            retorno.valido = false;
            //Log.Add('error', req.originalUrl, 'Conversation.Log', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }else{
            if (res.statusCode == 200) {
                var retorno = response;
                if (req.body.filter)
                    retorno = filterResult(req.body.filter, retorno);
                retorno.valido = true;
            }else{
                retorno.valido = false;
            }
            //Log.Add('info', req.originalUrl, 'Conversation.Log', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: err + 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
        }
        res.result = retorno;
        next();
    });
}
module.exports = new Conversation();