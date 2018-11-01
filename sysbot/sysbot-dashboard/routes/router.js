module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/api/conversation', ChatController.findConversationPage, function(req, res){
        res.json(res.body);
    });

    app.get('/api/conversation/find', ChatController.findConversationById, function(req, res){
        res.json(res.body);
    });

    app.get('/api/interations', ChatController.findInterations, function(req, res){
        res.json(res.body);
    });

    app.get('/api/conversation/days', ChatController.conversationDays, function(req, res){
        res.json(res.body);
    });

    app.get('/api/conversation/week', ChatController.conversationWeek, function(req, res){
        res.json(res.body);
    });

    app.get('/api/conversation/month', ChatController.conversationMonth, function(req, res){
        res.json(res.body);
    });

    app.get('/api/conversation/year', ChatController.conversationYear, function(req, res){
        res.json(res.body);
    });

    app.get('/api/intents', ChatController.getIntents, function(req, res){
        res.json(res.body);
    });

    app.get('/api/entities', ChatController.getEntities, function(req, res){
        res.json(res.body);
    })

    app.get('/api/getAvalAnalitic', ChatController.getAvalsAnalitic, function(req, res){
        res.json(res.body);
    });

    app.get('/api/getConfidenceAnalitic', ChatController.getConfidenceAnalitic, function(req, res){
        res.json(res.body);
    });

    app.post('/conversa/avaliacao', setAvaliaAll.Add, function (req, res) {
    });

    app.get('/api/logs', getLogs.autenticador, getLogs.centralapi, getLogs.dashboard, getLogs.sysbot, getLogs.webhook, function (req, res) {
        var logs = {
            "autenticador": req.body.autenticador,
            "centralapi": req.body.centralapi,
            "dashboard": req.body.dashboard,
            "sysbot": req.body.sysbot,
            "webhook": req.body.webhook
        }
        res.json(logs)
    });
    //app.post('/avalia/:aval', setAval.Add, function (req, res) {
    //res.sendStatus(200)
    //})
    app.post('/avalia/:classifica', setClassifica.Add, function (req, res) {
        res.sendStatus(200)
    });

    app.get('/api/extract', extract.chat, extract.autenticador, extract.centralapi, extract.dashboard, extract.sysbot, extract.webhook, function (req, res) {
        var fs = require('fs');
        var path = require('path');
        var extract = {
            "chat":req.body.chat,
            "logs":{
                "autenticador":req.body.autenticador,
                "centralapi":req.body.centralapi,
                "dashboard":req.body.dashboard,
                "sysbot":req.body.sysbot,
                "webhook":req.body.webhook,
            }
        }
        fs.writeFile("./public/extract/extract.json", JSON.stringify(extract), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Arquivo salvo em: /public/extract/extract.json");
                var teste = path.resolve('./public/extract/extract.json');
                var dirPath = __dirname;
                res.setHeader('Content-Disposition', 'attachment; filename=' + "extract.json");
                res.sendfile(teste);
            }
        });
    });
};
