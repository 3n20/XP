function XPFundsApiClient(){};
let EnvironmentConfig = require('../../../../sysbot/config/EnvironmentConfig');
let LogsController    = require('../../../../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
XPFundsApiClient.prototype.findInvestmentFunds = function(req, res, next){
    var body = {
        "customerTradingAccount": req.body.iduser
    };
    var endpoint = env.apiFundos;
    if(req.body.operacao){
        if(req.body.opt > 15 ){
            endpoint += '/api/v1/order/' + req.body.opt
        } else if(req.body.opt < 15){
            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao + '&status=' + req.body.opt;
        } else {
            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao;
        }
    }
    var options = {
        method: "GET",
        //url: 'http://investmentfunds-api-dsv.xpi.com.br:5134/api/v1/order?customerTradingAccount=321099',
        url: endpoint,
        json: body,
        timeout: 10000
    };
    request(options, function (err, response, body) {
        var result;
        if (req.body.operacao == 'R') {
            var endpoint = env.apiFundos;
            if(req.body.operacao) {
                if (req.body.opt > 15) {
                    endpoint += '/api/v1/order/' + req.body.opt
                } else if (req.body.opt < 15) {
                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T&status=' + req.body.opt;
                } else {
                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T';
                }
            }
            var optionsT = {
                method: "GET",
                url: endpoint,
                json: body,
                timeout: 10000
            };
            if(req.body.opt < 15 || !req.body.opt) {
                request(optionsT, function (err, responseT, body) {
                    if (err) {
                        //Log.Add('error', req.originalUrl, 'Xp.investmentfunds', 'Erro ao retornar request.', req.ip, {err: err}, false);
                        log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                        LogsController.salvaLogNaBase(log);  
                        var result = {result: {count: -1}};
                        res = result;
                        next();
                    } else {
                        if (responseT.statusCode == 200 || response.body) {
                            var retorno = {orders: []};
                            if (response.body && response.body.orders) {
                                retorno = response.body;
                            }
                            if (retorno.orders) {
                                if (responseT.body) {
                                    var jsonT = responseT.body;
                                    if (typeof responseT.body === 'string') {
                                        jsonT = JSON.parse(jsonT);
                                    }
                                    if (jsonT.orders) {
                                        jsonT.orders.forEach(function (value) {
                                            retorno.orders.push(value);
                                        });
                                    }
                                }
                            }

                            if (req.body.filter) {
                                console.log(retorno)
                                retorno = filterFounds(retorno);
                            }
                            res.result = retorno;
                        } else if (responseT.statusCode == 412) {
                            var result = {result: {count: -1}};
                            res.result = result;
                        } else if (responseT.statusCode == 204 && !response.body) {
                            var result = {result: {count: 0}};
                            res.result = result;
                        } else {
                            var result = {result: {count: -1}};
                            res.result = result;
                            //Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, {err: err}, false);
                            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                            LogsController.salvaLogNaBase(log);  
                        }
                        //Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                        log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
                        LogsController.salvaLogNaBase(log);  
                        next();
                    }
                });
            }else{
                if (req.body.filter) {
                    //console.log(body)
                    var retorno = filterFounds(body);
                    res.result = retorno;
                    //Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                    log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log);  
                    next();
                }
            }
        }else{
            if(err){//retorno.valido = false;
                //Log.Add('error', req.originalUrl, 'Xp.investmentfunds', 'Erro ao retornar request.', req.ip, {err: err}, false);
                log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log);  
                var result = {result: {count: -1}};
                res = result;
                next();
            } else {
                if (response.statusCode == 200) {
                    var retorno = response.body;
                    if (req.body.filter) {
                        retorno = filterFounds(retorno);
                    }
                    res.result = retorno;
                } else if (response.statusCode == 412) {
                    var result = {result: {count: -1}};
                    res.result = result;
                } else if (response.statusCode == 204) {
                    var result = {result: {count: 0}};
                    res.result = result;
                } else {
                    var result = {result: {count: -1}};
                    res.result = result;
                    //Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, {err: err}, false);
                    log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request ' + null, body: req.body};
                    LogsController.salvaLogNaBase(log);  
                }
                //Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso ' + null, body: req.body};
                LogsController.salvaLogNaBase(log);  
                next();
            }
        }
    });
};
module.exports = new XPFundsApiClient();