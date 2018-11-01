var Schema = mongoose.Schema;

var intents_analitics = new Schema({
    _id: { type: String, default: mongoose.Types.ObjectId().toString() },
    intents: String,
    confidence: String,
    dateCreated: Date,
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'conversation_analitics'},
    user: String,
    aval: Boolean
});

var IntentsModel = mongoose.model('intents_analitics', intents_analitics, 'intents_analitics');
module.exports = IntentsModel;