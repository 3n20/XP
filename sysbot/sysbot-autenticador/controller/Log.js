let EnvironmentConfig = require('../../sysbot/config/EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
function Log(){};
Log.prototype.Add = function(level, url, method, message, ip, meta, sendEmail){
    //async.parallel([function (callback) {
        console.log('send to log');
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
        request(options, function(err, response, body){
            if(err)
                //Log.Add('error', null, 'Log.Add', 'Erro ao enviar request para o LOG.', null, { body: null }, true);
            //if (response.statusCode == 200)
                //Log.Add('info', null, 'Log.Add', 'Request enviado com sucesso para o LOG.', null, { body: null }, false);
            console.log('log ok')
        });
   // }]);
};
module.exports = new Log();