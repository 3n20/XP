function Text(){};
let LogsController     = require('../controllers/Log');
let log                = new Object();
Text.prototype.replace = function(integracao, text){
    let textFinal      = text;
    while(text.search("{") != -1){	
        let pos_inicio = text.search("{");
        let pos_fim    = text.search("}");
        let value      = text.substring(pos_inicio+1, pos_fim);
        textFinal      = textFinal.replace(value, integracao.result[0][value]);
        text           = text.substring(pos_fim+1,text.length); 
    }
    textFinal          = textFinal.replace(/{/g, '');
    textFinal          = textFinal.replace(/}/g, '');   
    //Log.Add('info', null, 'text.replace', 'Chaves de valores substituidas com o retorno da API com sucesso', null, { texto: text }, false);
    log = {tipo: 'aviso', mensagem: 'Chaves de valores substituidas com o retorno da API com sucesso' + req.body.meta.timestamp, body: req.body};
    LogsController.salvaLogNaBase(log);
    return textFinal;
}
module.exports = new Text();