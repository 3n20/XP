function Message(){};
let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let LogsController    = require('../../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
Message.prototype.SendFromWebhookToBot = function(req, res, next){
    //console.log('Message SendFromWebhookToBot');
    let options = {
        method: "POST",
        url: env.urlSysbot,
        headers: {
            "token": env.tokenSysbot
        },
        json: req.body
    };
    request(options, function(err, response, body){
        if(err){
            //Log.Add('error', req.originalUrl, 'Message.SendFromBotToWebhook', 'Erro ao enviar request para o WEBHOOK.', req.ip, { body: req.body }, true);
            log = {tipo: 'erro', mensagem: err + 'Erro ao enviar request para o WEBHOOK' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);
        }else{
            //Log.Add('info', req.originalUrl, 'Message.SendFromBotToWebhook', 'Request enviado com sucesso para o WEBHOOK.', req.ip, { body: req.body }, false);
            log = {tipo: 'aviso', mensagem: 'Request enviado com sucesso para o WEBHOOK' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);
            req.body = body
            next();
        }
    });
};
Message.prototype.SendFromBotToWebhook = function(req, res, next){
    //console.log('Message SendFromBotToWebhook');   
};
module.exports = new Message();