'use strict';

require('dotenv').config({silent: true});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Service = require('./controllers/Service')    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())     



app.post('/webhook', function (req, res) {
    console.log(req.body)                                              
    Service.webhook(req.body)
});


app.post('/autenticador', function (req, res) {                                               
    Service.autenticador(req.body)
});


app.post('/sysbot', function (req, res) {  
    console.log('hehehehe')                                             
    Service.sysbot(req.body)
});

app.post('/centralapi', function (req, res) {                                               
    Service.centralapi(req.body)
});


app.post('/dashboard', function (req, res) {                                              
    Service.dashboard(req.body)
});


var port = process.env.PORT
app.listen(port, function () {
    console.log('SERVIÇO DE LOGS on na porta: ' + port);
});