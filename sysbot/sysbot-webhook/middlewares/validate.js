
function Validate(){};
let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let LogsController    = require('../../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
Validate.prototype.SendFromWebAppToBot = function(req, res, next){
    console.log('Validate SendFromWebAppToBot');
    if(req.params.token == env.tokenWebApp){
        next();
    }else{
        //console.log('erro');
        //Log.Add('error', req.originalUrl, 'Validate.SendFromWebAppToBot', 'Erro ao validar o token: ' + req.params.token, req.ip, { body: req.body }, true);
        log = {tipo: 'erro', mensagem: err + 'Erro ao validar o token ' + req.body.meta.timestamp, body: req.body};
        LogsController.salvaLogNaBase(log);  
        return res.sendStatus(404);
    }
};
module.exports = new Validate();