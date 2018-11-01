function Xp(){};
let EnvironmentConfig       = require('../../../../sysbot/config/EnvironmentConfig');
let LogsController          = require('../../../../sysbot/controllers/Log');
let log                     = new Object();
let env                     = new Object();
EnvironmentConfig.environmentConfig(env);
let WSHttpBinding           = require('wcf.js').WSHttpBinding;
let Proxy                   = require('wcf.js').Proxy;
let binding                 = new WSHttpBinding({
    SecurityMode: "None",
    TransportClientCredentialType: "None"
});
let urlAuthentication       = env.urlAuthentication;
let proxy                   = new Proxy(binding,urlAuthentication);
let applicationName         = env.ApplicationName;
let parse                   = require('xml-parser');
Xp.prototype.TDReportBasket = function(req, res, next){
    //console.log('api tesouro');
    var body = {
        "OperatorAction": req.body.iduser
    };
    var endPoint = env.apiTd + '/api/reportBasket?operatorAction=' + req.body.iduser + '&basketType=' + req.body.operacao;
    if(req.body.operacao){
        if(req.body.opt < 5 ){
            //console.log('buscar por status')
            ///api/ReportBasket?OperatorAction=35542&BasketSituation=2&TraderCpf=03441726944
            endPoint = endPoint + '&basketSituation=' + req.body.opt
        }else if(req.body.opt > 5){
            endPoint = endPoint + '&codeBasket=' + req.body.opt;
        }else if(req.body.opt){
            endPoint = endPoint + '&BasketSituation=' + req.body.opt;
        }
        if(req.body.codeBound){
            endPoint = endPoint + '&CodeBonds=' + req.body.codeBound;
        }
    }
    var options = {
        method: "GET",
        url: endPoint,
        json: body,
        timeout: 10000
    };
    request(options, function (err, response, body) {
        if(err){
            //Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, { err: err }, false);
            log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);  
            var result = {result: {count: -1}};
            res = result;
            next();
        }else{
            if(response.statusCode == 200){
                var retorno = response.body;
                retorno = filterTD(retorno);
                res.result = retorno;
            }else if(response.statusCode == 204){
                var result = {result: {count: 0}};
                res.result = result;
            }else if(response.statusCode == 412){
                var result = {result: {count: -1}};
                res.result = result;
            }else{
                //Log.Add('Error', req.originalUrl, 'Xp.TDReportBasket', 'Erro ao retornar request.', req.ip, { err: err }, false);
                log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log); 
                response.result.count = -1;
            }
            //Log.Add('info', req.originalUrl, 'Xp.TDReportBasket', 'Request efetuado com sucesso.', req.ip, { response: response }, false);
            log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log); 
            next();
        }
    });
};
Xp.prototype.investmentfunds = function(req, res, next){
    let body = {
        "customerTradingAccount": req.body.iduser
    };
    let endpoint = env.apiFundos;
    if(req.body.operacao){
        if(req.body.opt > 15 ){
            endpoint += '/api/v1/order/' + req.body.opt
        } else if(req.body.opt < 15){
            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao + '&status=' + req.body.opt;
        } else {
            endpoint += '/api/v1/order?customerTradingAccount='+req.body.iduser + '&operationType=' + req.body.operacao;
        }
    }
    let options = {
        method: "GET",
        //url: 'http://investmentfunds-api-dsv.xpi.com.br:5134/api/v1/order?customerTradingAccount=321099',
        url: endpoint,
        json: body,
        timeout: 10000
    };
    request(options, function(err, response, body){
        let result;
        if(req.body.operacao == 'R'){
            let endpoint = env.apiFundos;
            if(req.body.operacao) {
                if (req.body.opt > 15) {
                    endpoint += '/api/v1/order/' + req.body.opt
                } else if (req.body.opt < 15) {
                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T&status=' + req.body.opt;
                } else {
                    endpoint += '/api/v1/order?customerTradingAccount=' + req.body.iduser + '&operationType=T';
                }
            }
            let optionsT = {
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
                                //console.log(retorno)
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
        } else {
            if (err) {
                // retorno.valido = false;
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
                        //console.log(retorno)
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
                    log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                    LogsController.salvaLogNaBase(log); 
                }
                //Log.Add('info', req.originalUrl, 'Xp.investmentfunds', 'Request efetuado com sucesso.', req.ip, {response: response}, false);
                log = {tipo: 'aviso', mensagem: 'Request efetuado com sucesso' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log); 
                next();
            }
        }
    });
};
Xp.prototype.userSendSignature = function (req,res,next) {
    var iduser = req.body.iduser;
    var message =  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:tem='http://tempuri.org/'>" +
        "<soap:Header />" +
        "<soap:Body>" +
        "<tem:UserSendSignature>" +
        "<tem:applicationName>"+applicationName+"</tem:applicationName>" +
        "<tem:userName>"+iduser+"</tem:userName>" +
        "<tem:generateNewSignature>1</tem:generateNewSignature>" +
        "</tem:UserSendSignature>" +
        "</soap:Body>" +
        "</soap:Envelope>";
    proxy.send(message,env.urlUserSignature, function(response, ctx) {
        str = response;
        //console.log(str);
        var obj = parse(str);
        var res = obj.root.children[1].children[0].children[0].content
        //console.log(res);
        next();
    });
}
Xp.prototype.userSendPassword = function (req,res,next) {
    var iduser = req.body.iduser;
    var message =  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:tem='http://tempuri.org/'>" +
        "<soap:Header />" +
        "<soap:Body>" +
        "<tem:UserSendPassword>" +
        "<tem:applicationName>"+applicationName+"</tem:applicationName>" +
        "<tem:userName>"+iduser+"</tem:userName>" +
        "<tem:generateNewPassword>1</tem:generateNewPassword>" +
        "</tem:UserSendPassword>" +
        "</soap:Body>" +
        "</soap:Envelope>";
    proxy.send(message, env.urlUserPassword, function(response, ctx) {
        str = response;
        //console.log(str);
        var obj = parse(str);
        var res = obj.root.children[1].children[0].children[0].content
        //console.log(res);
        next();
    });
}
Xp.prototype.userInfoByCode = function (req, res, next){
    try{
        var userCode = req.body.iduser;
        var endpoint = env.apiUserInfo + '/' + userCode;
        var options = {
            method: "GET",
            url: endpoint,
            timeout: 10000
        };
        request(options, function(err, response){
            if(err){
                //Log.Add('Error', req.originalUrl, 'XPUserApiClient.userInfoByCode', 'Erro ao retornar request.', req.ip, { err: err }, false);
                log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
                LogsController.salvaLogNaBase(log); 
                var result = {result: {count: -1}};
                res = result;
                next();
            }
            res = response;
            next();
        });
    }catch(e){
        //Log.Add('Error', req.originalUrl, 'XPUserApiClient.userInfoByCode', 'Ocorreu um erro fatal. .', req.ip, { err: e }, false);
        log = {tipo: 'erro', mensagem: err + 'Erro ao retornar request' + req.body.meta.timestamp, body: req.body};
        LogsController.salvaLogNaBase(log); 
        next();
    }
};
module.exports = new Xp();