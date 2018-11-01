let request        = require('request');
let LogsController = require('../controllers/Log');
let log            = new Object();
class CentralApiService{
    constructor(){};
    centralApiWatson(dadosWatson, req){
        let dados      = dadosWatson.output.api;
        dados.iduser   = req.body.meta.iduser;
        dados.operacao = dadosWatson.output.operacao;
        dados.tipo     = dadosWatson.output.tipo;
        if(req.body.meta.codeBound){
            dados.codeBound = req.body.meta.codeBound;
        }
        if(req.body.meta.opt){
            dados.opt = req.body.meta.opt;
        }
        let options = {
            method: "POST",
            url: dados.endpoint,
            json: dados
        }
        return new Promise(function(accept, reject){
            request(options, function(err, resp, body){
                if(err){
                    reject(err);
                    //Log.Add('error', req.originalUrl, 'api', 'Erro na chamada da API('+ dados.endpoint +'): '+err, req.ip, { body: req.body }, false);
                    log = {tipo: 'erro', mensagem: err + 'Erro na chamada da API(' + dados.endpoint + ')' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                }else{
                    accept(body);
                }
            });
        });
    }
}
module.exports = CentralApiService;