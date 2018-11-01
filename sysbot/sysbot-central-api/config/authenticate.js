function Authenticate(){};
let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let LogsController    = require('../../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
Authenticate.prototype.Internal = function(req, res, next){
    if(req.headers.token == env.token){
        next();
    }else{
        //Log.Add('info', req.originalUrl, 'Authenticate.Internal', 'Autenticação interna não permitida.', req.ip, { obj: req.headers }, false);
        log = {tipo: 'aviso', mensagem: 'Autenticação interna não permitida' + req.body.meta.timestamp, body: req.body};
        LogsController.salvaLogNaBase(log);
        res.sendStatus(404);
    }
};
Authenticate.prototype.External = function(req, res, next){};
module.exports = new Authenticate();