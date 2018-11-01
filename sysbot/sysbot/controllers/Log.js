let LogsModel          = require('../model/LogsModel');
exports.salvaLogNaBase = function salvaLogNaBase(log){
    let dados          = LogsModel(log);
    dados.save(function(err, suc){
        if (err) return handleError(err);
        console.log('log salvo com sucesso! ' + suc);
    });
}