var express = require('express');
var bodyParser = require('body-parser');
moment = require('moment');
moment.locale('pt-BR');
request = require('request');
linq = require('linq');
apicache = require('apicache');
apicache.options({
    appendKey: ['body'],
    stringify: true,
    statusCodes: {
        include: [200, 201, 202, 203, 204, 205, 206, 207]
    }
})
cache = apicache.middleware;
http = require('http');
async = require("async");

/*if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}*/

require('./db/connection');
systemController = require('./controller/systemController');
extract = require('./controller/extract');
Log = require('./config/log');
ChatController = require('./controller/chat');
Conversations = require('./controller/Conversations');
filterByDay = require('./config/filterByDay');
filterByWeek = require('./config/filterByWeek');
filterByMonth = require('./config/filterByMonth');
filterByYear = require('./config/filterByYear');
getLogs = require('./middlewares/getLogs');
setAval = require('./middlewares/setAval') ;
setClassifica = require('./middlewares/setClassifica') ;
setAvaliaAll = require('./middlewares/setAvaliaAll') ;
let EnvironmentConfig = require('../sysbot/config/EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
var port = env.portDashboard;
var app = express();
app.use(express.static('./public'));
app.enable('trust proxy');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./routes/router.js')(app);


app.listen(port, function () {
    Log.Add('info', null, 'app.listen', 'Servidor express foi iniciado com sucesso.', null, { port: port }, false);
});

exports = module.exports = app;