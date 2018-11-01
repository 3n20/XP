function Authenticate(){};
let LogsController           = require('../../../../sysbot/controllers/Log');
let log                      = new Object();
visaTokenValidation          = "";
Authenticate.prototype.Login = function(req, res, next){
    try {
        var login = {
            "Email": "chatbot@hyperativa.com.br",
            "Senha": "#YaCuYHRIv0h1TJzQ#K#gVb50C60$*&qrsOoh$X@",
            "IP": "http://cia.smarte.rs"
        };
        var options = {  
            url: 'https://www.visaform.com.br/api/loginsys/autenticar/index.view.html',
            method: "POST",              
            headers: {
                "content-type": "application/json",
            },
            body: login,
            json: true
        };
        request(options, function(err, response, body){
            if(body.logado == true){
                visaTokenValidation = body.token;   
                next(req, res, next);
            }else{
                //Log.Add('info', req.originalUrl, 'WATSON.Authenticate.Authenticate', 'Autenticação externa não permitida.', req.ip, { obj: body }, false);
                log = {tipo: 'aviso', mensagem: 'Autenticação externa não permitida' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log);  
                res.sendStatus(401);
            }
        });
    }catch(err){
        //Log.Add('error', req.originalUrl, 'WATSON.Authenticate.Authenticate', 'Erro ao fazer autenticação.', req.ip, { obj: err }, false);
        log = {tipo: 'erro', mensagem: err + 'Erro ao fazer autenticação' + req.body.meta.timestamp, body: req.body};
        LogsController.salvaLogNaBase(log);  
        res.sendStatus(401);
    }
};
module.exports = new Authenticate();