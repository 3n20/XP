let LogsService = require('../services/SysbotService');
let Schema      = LogsService.Schema;
let logs        = new Schema({
    tipo: String,
    mensagem: String,
    body: Object()
});
let LogsModel   = LogsService.model('logs', logs, 'logs');
module.exports  = LogsModel; 