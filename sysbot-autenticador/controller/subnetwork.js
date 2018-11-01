function SubnetworkController(){};
let SubnetworkModel = require('../db/models/subnetwork');
let LogsController  = require('../../sysbot/controllers/Log');
let log             = new Object();
SubnetworkController.prototype.SubnetworkMemory = function () {
    SubnetworkModel.find({}, function (err, Subnetwork) {
        if (err || !Subnetwork) {
            //Log.Add('error', req.originalUrl, 'SubnetworkController.SubnetworkMemory', 'Erro ao carregar dados de subnetwork.', req.ip, { err: err }, true);
            log = {tipo: 'erro', mensagem: err + 'Erro ao carregar dados de subnetwork ' + null, body: SubnetworkController.SubnetworkMemory};
            LogsController.salvaLogNaBase(log);  
            return res.sendStatus(403);
        }
        _Subnetwork = Subnetwork;
        //console.log("carregou memoria Subnetwork")
        //Log.Add('info', null, 'SubnetworkController.SubnetworkMemory', 'Memoria subnetwork carregada.', null, { Subnetwork: _Subnetwork }, true);
        log = {tipo: 'aviso', mensagem: 'Memoria subnetwork carregada ' + null, body: SubnetworkController.SubnetworkMemory};
        LogsController.salvaLogNaBase(log);  
    });
}
module.exports = new SubnetworkController();