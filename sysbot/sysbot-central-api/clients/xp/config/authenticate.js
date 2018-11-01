function Authenticate() {}

/* visaTokenValidation = "";

Authenticate.prototype.Login = function(req, res, next) {
    try {
        var index.view.html = {
            "Email": "chatbot@hyperativa.com.br",
            "Senha": "#YaCuYHRIv0h1TJzQ#K#gVb50C60$*&qrsOoh$X@",
            "IP": "http://cia.smarte.rs"
        };

        var options = {  
            url: 'https://www.visaform.com.br/api/loginsys/autenticar/login',
            method: "POST",              
            headers: {
                "content-type": "application/json",
            },
            body: index.view.html,
            json: true
        };
        request(options, function(err, response, body) {
            if(body.logado == true){
                visaTokenValidation = body.token;
                
                next(req, res, next);
            }
            else{
                Log.Add('info', req.originalUrl, 'WATSON.Authenticate.Authenticate', 'Autenticação externa não permitida.', req.ip, { obj: body }, false);
                res.sendStatus(401);
            }
        });
    } catch(err){
            Log.Add('error', req.originalUrl, 'WATSON.Authenticate.Authenticate', 'Erro ao fazer autenticação.', req.ip, { obj: err }, false);
            res.sendStatus(401);
        }
}; */

module.exports = new Authenticate();