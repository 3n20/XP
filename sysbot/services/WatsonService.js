let conversation = require('../config/WatsonAssistant');
class WatsonService{
    constructor(){}
    enviarWatson(mensagem, req){
        return new Promise(function(accept, reject){
            conversation.message(mensagem, function(err, result){
                if(err){
                    reject(err);
                }
                accept(result);
            });
        });
    }
}
module.exports = WatsonService;