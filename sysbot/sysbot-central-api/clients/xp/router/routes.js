var express = require('express');
var router = express.Router();

//var Validation = require('./clients/watson/validation/validation');
//var XpController = require('../../../clients/xp/controller/xp');
var XPFundsApiCliente = require('../controller/XPFundsApiClient');
var XPTesoureReportBasket = require('../controller/XPTesoureReportBasket');
var XPUserApiClient = require('../controller/XPUserApiClient');

router.post('/xp/investmentfunds/', XPFundsApiCliente.findInvestmentFunds, function (req, res) {
    console.log('Fundos ok');
    res.send(res.result);
});


router.post('/xp/td/protocols', XPTesoureReportBasket.findTesoureReportBasket, function (req, res) {
    console.log('Tesouro ok')
    res.send(res.result);
});

router.post('/xp/usersendsignature/', XPUserApiClient.userSendSignature, function (req, res) {
    console.log('Assinatura ok');
    res.send(res.result);
});

router.post('/xp/usersendpassword/', XPUserApiClient.userSendPassword, function (req, res) {
    console.log('Senha ok');
    res.send(res.result);
});

router.get('/xp/userInfoByCode', XPUserApiClient.userInfoByCode, function (req, res) {
    console.log('Info By Code ok')
    res.send(res.result);
});


module.exports = router;