var Schema = mongoose.Schema;

var chatInteration = new Schema({
    input: String,
    output: [],
    dateCreated: Date,
    user: String,
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'conversation_analitics'},
    intents: {},
    entities: []
});

var ChatInterationModel = mongoose.model('chat_analitics', chatInteration, 'chat_analitics');
module.exports = ChatInterationModel;