var Schema = mongoose.Schema;

var Intent = new Schema({
  intent: String,
  confidence: String
}, { _id: false });

var Entities = new Schema({
  entity: String,
  location: Object,
  value: String,
  confidence: String
}, { _id: false });

var schema = new Schema({
  _id: {type: String, default: mongoose.Types.ObjectId().toString()},
  idsubnetwork: String,
  idagent: String,
  iduser: String,
  from: String,
  to: String,
  input: String,
  intents: Intent,
  entities: Entities,
  output: String,
  conversation_id: String,
  timestamp: Date,
  object: Object,
  dt_created: { type: Date }
});

var ChatModel = mongoose.model('chat__', schema, 'chat__');

module.exports = ChatModel;