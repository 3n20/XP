/*'use strict';
require('dotenv').config({silent: true});*/
var express = require("express");
var bodyParser = require("body-parser");
var Service = require('./controllers/Service') 
let EnvironmentConfig = require('../sysbot/config/EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);   
var port = env.portLogs;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/webhook', function (req, res) {
    //console.log(req.body)                                              
    Service.webhook(req.body)
});
app.post('/autenticador', function (req, res) {                                               
    Service.autenticador(req.body)
});
app.post('/sysbot', function (req, res) {  
    //console.log('hehehehe')                                             
    Service.sysbot(req.body)
});
app.post('/centralapi', function (req, res) {                                               
    Service.centralapi(req.body)
});
app.post('/dashboard', function (req, res) {                                              
    Service.dashboard(req.body)
});
app.listen(port, function () {
    console.log('SERVIÇO DE LOGS on na porta: ' + port);
});