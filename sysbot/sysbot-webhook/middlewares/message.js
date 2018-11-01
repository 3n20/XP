function Message(){};
let request           = require('request');
let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
Message.prototype.SendFromWebAppToBot = function(req, res, next){
    if(req.body){
        let options = {
            method: "POST",
            url: env.urlAutenticador + env.tokenAutenticador,
            headers: {"token": env.tokenAutenticador},
            json: req.body
        };
        request(options, function(err, response, body){
            if(err){
                console.log(err)
                //Log.Add('error', req.originalUrl, 'Message.SendFromWebAppToBot', 'Erro ao realizar request para o autenticador', req.ip, {erro:err}, true);
            }else{
                //Log.Add('info', req.originalUrl, 'Message.SendFromWebAppToBot', 'Enviado para o autenticador', req.ip, {body: body.response}, true);
                req.body = body;
                console.log(response.body);
                next();
            }
        });
    }
};
Message.prototype.SendFromBotToWebApp = function(req, res, next){};
module.exports = new Message();