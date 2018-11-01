var express = require('express');
var router = express.Router();

//var Validation = require('./clients/watson/validation/validation');
var ConversationController = require('../../../clients/watson/controller/conversation');

router.post('/watson/intents/list', Logger.Internal, Authenticate.Internal, ConversationController.IntentsList, function (req, res) {
    res.send(res.result);
})

router.post('/watson/intents/create', Logger.Internal, Authenticate.Internal, ConversationController.IntentsCreate, function (req, res) {
    res.send(res.result);
})

router.post('/watson/intents/delete', Logger.Internal, Authenticate.Internal, ConversationController.IntentsDelete, function (req, res) {
    res.send(res.result);
})

router.post('/watson/examples/list', Logger.Internal, Authenticate.Internal, ConversationController.ExamplesList, function (req, res) {
    res.send(res.result);
})

router.post('/watson/examples/create', Logger.Internal, Authenticate.Internal, ConversationController.ExamplesCreate, function (req, res) {
    res.send(res.result);
})

router.post('/watson/examples/delete', Logger.Internal, Authenticate.Internal, ConversationController.ExamplesDelete, function (req, res) {
    res.send(res.result);
})

router.post('/watson/log', Logger.Internal, Authenticate.Internal, ConversationController.Log, function (req, res) {
    res.send(res.result);
})

module.exports = router;