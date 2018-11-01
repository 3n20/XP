let express                 = require('express');
let bodyParser              = require('body-parser');
let Text                    = require('../controllers/Text');
let LogsController          = require('../controllers/Log');
let respostaWatsonAssistant = require('../controllers/respostaWatsonAssistantController');//Anderson - criação de novo controller para respostas do watson
let FundosService           = require('../services/FundosService');
let TesouroDireto           = require('../services/TesouroDiretoService');
let WatsonService           = require('../services/WatsonService');
let CentralApiService       = require('../services/CentralApiService');
let UserInfoService         = require('../services/UserInfoService');
let log                     = new Object();
let app                     = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
function Message(){}
Message.prototype.sendFromOrchestratorToNlp = async function(req, res, next){
    if(req.body.meta.iduser == '0000000'){//2534230
        req.body.context.monitoramento = true;
        //Log.Add('monitoramento = ' + req.body.context.monitoramento);
        log = {tipo: 'erro', mensagem: err + 'Estou no monitoramento' + req.body.meta.timestamp, body: req.body};
        LogsController.salvaLogNaBase(log); 
        setTimeout(function(){
            res.send(req.body);
        },999);
    }else{
        let context     = req.body.context;
        let message     = await validarPrimeiroAcesso(req, context);
        validadorFundos(req, message);
        validadorTD(req, message);
        let watson       = new WatsonService();
        let watsonResult = await watson.enviarWatson(message, req);
        if(watsonResult.output.api){
            chamarCentralApi(watsonResult, req, next);
        }else{
            req.body.context.monitoramento = false;
            req.body.response              = watsonResult;
            respostaWatsonAssistant.respostaWatsonAssistantController(watsonResult);//Anderson - chamando novo controller de respostas do watson
            //Log.Add('info', req.originalUrl, 'conversation.callback', 'Mensagem enviada e recebida pela NPL', req.ip, { body: req.body }, false);
            log = {tipo: 'aviso', mensagem: 'Mensagem enviada e recebida pela NPL' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);             
            next();
        }
    }
};
function validadorTD(req, message) {
    if (req.body.meta.opt && req.body.context.resulttd) {
        var opt = req.body.meta.opt;
        if (opt > 15) {
            limparListasTD(message);
            var unregistered = req.body.context.resulttdOriginal.unregistered ? req.body.context.resulttdOriginal.unregistered : [];
            var pending = req.body.context.resulttdOriginal.pending ? req.body.context.resulttdOriginal.pending : [];
            var settlement = req.body.context.resulttdOriginal.settlement ? req.body.context.resulttdOriginal.settlement : [];
            var proccessed = req.body.context.resulttdOriginal.proccessed ? req.body.context.resulttdOriginal.proccessed : [];
            var canceled = req.body.context.resulttdOriginal.canceled ? req.body.context.resulttdOriginal.canceled : [];
            var finished = req.body.context.resulttdOriginal.finished ? req.body.context.resulttdOriginal.finished : [];
            unregistered.filter(function (investimento) {
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.unregistered = [];
                    message.context.resulttd.unregistered.push(investimento);
                }
            });
            finished.filter(function (investimento){
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.finished = [];
                    message.context.resulttd.finished.push(investimento);
                }
            });
            pending.filter(function (investimento) {
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.pending = [];
                    message.context.resulttd.pending.push(investimento);
                }
            });
            settlement.filter(function (investimento) {
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.settlement = [];
                    message.context.resulttd.settlement.push(investimento);
                }
            });
            proccessed.filter(function (investimento) {
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.proccessed = [];
                    message.context.resulttd.proccessed.push(investimento);
                }
            });
            canceled.filter(function (investimento) {
                if (investimento.codeBasket == opt && investimento.codeBonds == req.body.meta.codeBound) {
                    message.context.resulttd.count = 1;
                    message.context.resulttd.canceled = [];
                    message.context.resulttd.canceled.push(investimento);
                }
            });
        } else {
            message.context.detalhes = null;
            message.context.resulttd = req.body.context.resulttdOriginal;
        }
    }
}
function validadorFundos(req, message) {
    //1-requested
    //2-approved
    //3-pending
    //4-disapproved
    //5-scheduled
    //6-proccessed
    //7-canceled
    //8-processfailed
    //9-inExecution
    if (req.body.meta.opt && req.body.context.resultFundos) {
        var opt = req.body.meta.opt;
        if (opt > 15) {
            limparListasFundos(message);
            var requested = req.body.context.resultFundosOriginal.requested ? req.body.context.resultFundosOriginal.requested : [];
            var approved = req.body.context.resultFundosOriginal.approved ? req.body.context.resultFundosOriginal.approved : [];
            var pending = req.body.context.resultFundosOriginal.pending ? req.body.context.resultFundosOriginal.pending : [];
            var disapproved = req.body.context.resultFundosOriginal.disapproved ? req.body.context.resultFundosOriginal.disapproved : [];
            var scheduled = req.body.context.resultFundosOriginal.scheduled ? req.body.context.resultFundosOriginal.scheduled : [];
            var proccessed = req.body.context.resultFundosOriginal.proccessed ? req.body.context.resultFundosOriginal.proccessed : [];
            var canceled = req.body.context.resultFundosOriginal.canceled ? req.body.context.resultFundosOriginal.canceled : [];
            var processfailed = req.body.context.resultFundosOriginal.processfailed ? req.body.context.resultFundosOriginal.processfailed : [];
            var inExecution = req.body.context.resultFundosOriginal.inExecution ? req.body.context.resultFundosOriginal.inExecution : [];
            requested.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.requested = [];
                    message.context.resultFundos.requested.push(investimento);
                }
            });
            approved.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.approved = [];
                    message.context.resultFundos.approved.push(investimento);
                }
            });
            pending.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.pending = [];
                    message.context.resultFundos.pending.push(investimento);
                }
            });
            disapproved.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.disapproved = [];
                    message.context.resultFundos.disapproved.push(investimento);
                }
            });
            scheduled.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.scheduled = [];
                    message.context.resultFundos.scheduled.push(investimento);
                }
            });
            proccessed.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.proccessed = [];
                    message.context.resultFundos.proccessed.push(investimento);
                }
            });
            canceled.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.canceled = [];
                    message.context.resultFundos.canceled.push(investimento);
                }
            });
            processfailed.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.processfailed = [];
                    message.context.resultFundos.processfailed.push(investimento);
                }
            });
            inExecution.filter(function (investimento) {
                if (investimento.id == opt) {
                    message.context.resultFundos.count = 1;
                    message.context.resultFundos.inExecution = [];
                    message.context.resultFundos.inExecution.push(investimento);
                }
            });
        } else {
            message.context.detalhes = null;
            message.context.resultFundos = req.body.context.resultFundosOriginal;
        }
    }
}
//1-requested
//2-approved
//3-pending
//4-disapproved
//5-scheduled
//6-proccessed
//7-canceled
//8-processfailed
//9-inExecution
function limparListasFundos(message){
    message.context.resultFundos.requested = [];
    message.context.resultFundos.approved = [];
    message.context.resultFundos.pending = [];
    message.context.resultFundos.disapproved = [];
    message.context.resultFundos.scheduled = [];
    message.context.resultFundos.proccessed = [];
    message.context.resultFundos.canceled = [];
    message.context.resultFundos.processfailed = [];
    message.context.resultFundos.inExecution = [];
    message.context.resultFundos.count = 0;
}
function limparListasTD(message){
    message.context.resulttd.canceled = [];
    message.context.resulttd.pending = [];
    message.context.resulttd.settlement = [];
    message.context.resulttd.proccessed = [];
    message.context.resulttd.unregistered = [];
    message.context.resulttd.count = 0;
}
async function chamarCentralApi(watsonResult, req, next){
    var watson = new WatsonService();
    var workspace_id = req.body.idagent;
    var centralApiService = new CentralApiService();
    var centralApiResult = await centralApiService.centralApiWatson(watsonResult, req);
    switch (watsonResult.output.api.next) {
        case 'return':
            var context = watsonResult.context;
            var msg = { input: centralApiResult, workspace_id, context };
            var resultWatsonApi = await watson.enviarWatson(msg, req);
            req.body.response = resultWatsonApi;
            next();
            break;
        case 'replace':
            if (watsonResult.api.next == 'replace') {
                centralApiResult.output.text = Text.replace(body, centralApiResult.output.text[0]);
            }
            req.body.response = watsonResult;
            next();
        case 'send_password':
            var context = req.body.context;
            context.resultado_senha = centralApiResult;
            var msg = { input: {text:"sim"}, workspace_id, context };
            var watson = new WatsonService();
            var watsonResultPassword = await watson.enviarWatson(msg, req);
            req.body.response = watsonResultPassword;
            //Log.Add('info', req.originalUrl, 'conversation.callback', 'Mensagem enviada e recebida pela NPL', req.ip, { body: req.body }, false);
            log = {tipo: 'aviso', mensagem: 'Mensagem enviada e recebida pela NPL' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log); 
            next();
        case 'send_signature':
            var context = req.body.context;
            context.resultado_senha = centralApiResult;
            var msg = { input: {text:"sim"}, workspace_id, context };
            var watson = new WatsonService();
            var watsonResultSignature = await watson.enviarWatson(msg, req);
            req.body.response = watsonResultSignature;
            //Log.Add('info', req.originalUrl, 'conversation.callback', 'Mensagem enviada e recebida pela NPL', req.ip, { body: req.body }, false);
            log = {tipo: 'aviso', mensagem: 'Mensagem enviada e recebida pela NPL' + req.body.meta.timestamp, body: req.body};
            LogsController.salvaLogNaBase(log);             
            next();
    }

    // if (watsonResult.output.api.next == 'return') {
    //     var context = watsonResult.context;
    //     var msg = { input: centralApiResult, workspace_id, context };
    //     var resultWatsonApi = await watson.enviarWatson(msg, req);
    //
    //     req.body.response = resultWatsonApi;
    //     next();
    // }
    // else {
    //     if (watsonResult.api.next == 'replace') {
    //         centralApiResult.output.text = Text.replace(body, centralApiResult.output.text[0]);
    //     }
    //     req.body.response = watsonResult;
    //     next();
    // }
}

async function validarPrimeiroAcesso(req, context){
    var usuarioInfoService = new UserInfoService();
    var workspace_id       = req.body.idagent;
    return new Promise(async function(accept, reject){
        if(req.body.isFirstConversation){
            context.fundos            = false;
            context.td                = false;
            context.resultFundos      = null;
            context.resulttd          = null;
            context.resultAll         = null;
            req.body.context.detalhes = null;
            var infoUsuario = await usuarioInfoService.pesquisarUsuarioPorCodigo(req.body.meta.iduser).catch(function(err){
                reject({input: {text: req.body.interaction.text }, workspace_id, context});
            });
            context.saudacaoPeriodo = saudacaoPeriodo();
            if(infoUsuario && infoUsuario.body){
                context.nomeUsuario = JSON.parse(infoUsuario.body).dadosBasicos.nome;
                var fundos                   = await pesquisarFundos(req);
                var tesouroDireto            = await pesquisarTD(req);
                if(tesouroDireto.result.count > 0){
                    context.td               = true;
                    context.resulttd         = tesouroDireto.result;
                    context.resulttdOriginal = tesouroDireto.result;
                }else{
                    context.td = false;
                }
                if(fundos.result.count > 0){
                    context.fundos               = true;
                    context.resultFundos         = fundos.result;
                    context.resultFundosOriginal = fundos.result;
                }else{
                    context.fundos = false;
                }
                if(context.td && context.fundos){
                    context.resultAll = [];
                    context.resultAll.push(context.resultFundos);
                    context.resultAll.push(context.resulttd);
                }
                accept({input: {text: 'ola'}, workspace_id, context});
            }else{
                accept({input: {text: req.body.interaction.text}, workspace_id, context});
            }
        }else{
            accept({input: {text: req.body.interaction.text}, workspace_id, context});
        }
    });
}
async function pesquisarFundos(req){
    var fundosService = new FundosService();
    return fundosService.pesquisarFundosPorUsuario(req.body.meta.iduser);
}
async function pesquisarTD(req){
    var tesouroDireto = new TesouroDireto();
    return tesouroDireto.pesquisarTesouroDiretoPorUsuario(req.body.meta.iduser);
}
function saudacaoPeriodo(){
    var data = new Date();
    var hora = data.getHours();
    var saudacao = '';

    if(hora >= 0 && hora <= 12){
        saudacao = 'Bom Dia';
    }
    if(hora > 12 && hora <= 18){
        saudacao = 'Boa Tarde';
    }
    if(hora > 18 && hora <= 24){
        saudacao = 'Boa Noite';
    }
    return saudacao;
}
module.exports = new Message();