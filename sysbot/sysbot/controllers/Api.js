function Api(){};//REQUISIÇÃO SÍNCRONA
let request                = require('request');
let resp                   = '';
let LogsController         = require('../controllers/Log');
let log                    = new Object();
Api.prototype.ChamaExterno = function(dados){
    let options = {
        method: "POST",
        url: dados.endpoint,
        json: dados
    };
    request(options, function(err, response, body){
        if(err){
            log = {tipo: 'erro', mensagem: err + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);
        }else{
            //console.log(body); 
            //resp = body;         
        } 
    });
    return resp;
}
module.exports = new Api();