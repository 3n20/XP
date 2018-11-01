var Schema = mongoose.Schema;

var intents_analitics = new Schema({
    intents: String,
    confidence: String,
    dateCreated: Date,
    aval: Boolean,
    user: String,
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'conversation_analitics'}
});

var IntentsModel = mongoose.model('intents_analitics', intents_analitics, 'intents_analitics');
module.exports = IntentsModel;