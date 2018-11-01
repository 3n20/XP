var Schema = mongoose.Schema;

var Intent = new Schema({
    intent: String,
    confidence: String
}, { _id: false });

var schema = new Schema({
    _id: {type: String, default: mongoose.Types.ObjectId().toString()},
    idsubnetwork: String,
    idagent: String,
    iduser: String,
    from: String,
    to: String,
    conversation_id: String,
    timestamp: Date,
    interations: [],
    dt_created: { type: Date },
    status_conversation: String,
    avaliacao_geral: String,
    input: String,
    intents: Intent,
    output: String,
    object: Object,
    idnode: String,
    aval: Boolean
});

var ChatModel = mongoose.model('chat', schema, 'chat');

module.exports = ChatModel;