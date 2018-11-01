var Schema = mongoose.Schema;
var Context = new Schema({
  dt_created: { type: Date },
  value: Object
}, { _id: false });
// var Particulary = new Schema({
// }, { _id: false });
var schema = new Schema({
  //linha de inclusão do _id na definição do schema comentada para não gerar erro de chave duplicada na inclusão de um novo usuário.
  //_id: { type: String, default: mongoose.Types.ObjectId().toString() },
  idproject: String,
  idnetwork: String,
  idsubnetwork: String,
  iduser: String,
  context: Context,
  particulary: Object,
  dt_created: { type: Date },
  dt_updated: { type: Date, default: Date.now }
});
var UserModel = mongoose.model('user', schema, 'user');
module.exports = UserModel;