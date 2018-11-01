function Log(){};
let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
Log.prototype.Add = function(level, url, method, message, ip, meta, sendEmail){
    let body = {
        level: level,
        url: url,
        method: method,
        message: message,
        ip: ip,
        meta: meta,
        sendEmail: sendEmail
    }
    let options = {
        method: "POST",
        url: env.urlLogsAutenticador,
        json: body
    };
    //console.log(meta)
    request(options, function(err, response, body){
        if(err)
            //Log.Add('error', req.originalUrl, 'Log.Add', 'Erro ao enviar request para o LOG.', req.ip, { body: req.body }, true);
            console.log('log nao ok')
            //if(response.statusCode == 200)
            //Log.Add('info', req.originalUrl, 'Log.Add', 'Request enviado com sucesso para o LOG.', req.ip, { body: req.body }, false);
    });
};
module.exports = new Log();