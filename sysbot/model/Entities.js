var Schema = mongoose.Schema;

var entities_analitics = new Schema({
    entity: String,
    confidence: String,
    value: String,
    dateCreated: Date,
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'conversation_analitics'},
    intent: {type: mongoose.Schema.Types.ObjectId, ref: 'intents_analitics'}
});

var EntitiesModel = mongoose.model('entities_analitics', entities_analitics, 'entities_analitics');
module.exports = EntitiesModel;