let express           = require('express');
let bodyParser        = require('body-parser');
request               = require('request');
linq                  = require('linq');
async                 = require("async");
require('./db/connection');
Log                   = require('./controller/Log');
let Subnetwork        = require('./middlewares/subnetwork');
let User              = require('./middlewares/user');
let Message           = require('./middlewares/message');
let EnvironmentConfig = require('../sysbot/config/EnvironmentConfig');
let app               = express();
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
let port              = env.portAutenticador;
app.enable('trust proxy');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
let router            = express.Router();
router.post('/webhook/:token', Subnetwork.ValidateFromWebhookToBot, User.ValidateFromWebhookToBot, Message.SendFromWebhookToBot, function (req, res) {
    res.send(req.body);
});
app.use('/', router);
app.listen(port, function(){
    console.log(port);
});