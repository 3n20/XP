let express           = require('express');
let bodyParser        = require('body-parser');
let EnvironmentConfig = require('./config/EnvironmentConfig');
require('./model/connection');
let Context           = require('./middlewares/Context');
let Message           = require('./middlewares/Message');
let Chat              = require('./middlewares/Chat');
let Template          = require('./middlewares/Template');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
let port              = env.portaSysbot;
let app               = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post('/send', Context.getContext, Message.sendFromOrchestratorToNlp, Chat.Add, Template.toAuthenticator, Context.setContext, function(req, res){
    res.send(req.body)
    //Log.Add('info', req.originalUrl, 'post', 'mensagem prestes a ser enviada', req.ip, { body: req.body }, false); //log inicial
});
app.listen(port, function(){
    console.log('SYSBOT on na porta: ' + port);
    //Log.Add('info', null, 'app.listen', 'Servidor express foi iniciado com sucesso.', null, {port: port}, false);
});