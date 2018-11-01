var Schema = mongoose.Schema;
var conversation_analitics = new Schema({
    idsubnetwork: String,
    idagent: String,
    iduser: String,
    from: String,
    to: String,
    intents: {type: mongoose.Schema.Types.ObjectId, ref: 'intents_analitics'},
    conversation_id: String,
    timestamp: Date,
    interations_chat: [],
    dt_created: Date,
    status_conversation: String
});
var ConversationModel = mongoose.model('conversation_analitics', conversation_analitics, 'conversation_analitics');
module.exports = ConversationModel;
