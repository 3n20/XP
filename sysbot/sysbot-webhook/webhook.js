let express           = require('express');
let bodyParser        = require('body-parser');
let ExpressBrute      = require('express-brute');
let Log               = require('./controllers/Log');
let Message           = require('./middlewares/message');
let Validade          = require('./middlewares/validate');
let EnvironmentConfig = require('../sysbot/config/EnvironmentConfig');
let LogsController    = require('../sysbot/controllers/Log');
let log               = new Object();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
let store             = new ExpressBrute.MemoryStore();
let bruteforce        = new ExpressBrute(store,{
    freeRetries: 200,
    minWait: 1 * 1000,
    maxWait: 1 * 1000,
    lifetime: 1
});
let port              = env.portWebhook;
let app               = express();
let router            = express.Router();
app.enable('trust proxy');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.post('/webapp/:token', Validade.SendFromWebAppToBot, Message.SendFromWebAppToBot, function(req, res){
    //Log.Add('info', req.originalUrl, 'router.webapp', 'Mensagem enviada para o WEBAPP.', req.ip, {body: req.body}, false);
    log = {tipo: 'aviso', mensagem: 'Mensagem enviada para o WEBAPP ' + null, body: port};
    LogsController.salvaLogNaBase(log);  
    res.send(req.body)
});
app.use('/', router);
app.listen(port, function(){
    console.log(port);
    //Log.Add('info', null, 'app.listen', 'Serviço de LOGS foi iniciado com sucesso.', null, {port: port});
    log = {tipo: 'aviso', mensagem: 'Serviço de LOGS iniciado com sucesso ' + null, body: port};
    LogsController.salvaLogNaBase(log);  
});