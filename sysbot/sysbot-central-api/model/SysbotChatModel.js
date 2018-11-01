let SysbotChatService = require('../services/SysbotChatService');
let Schema            = SysbotChatService.Schema;
let chat              = new Schema({
    idsubnetwork: String,
    idagent: String,
    iduser: String,
    from: String,
    to: String,
    conversation_id: String,
    timestamp: Date,
    conversation: {type: SysbotChatService.Schema.Types.ObjectId, ref: 'conversation_analitics'},
    dt_created: Date,
    status_conversation: String,
    avaliacao_geral: String
});
let SysbotChatModel = SysbotChatService.model('chat', chat, 'chat');
module.exports      = SysbotChatModel;