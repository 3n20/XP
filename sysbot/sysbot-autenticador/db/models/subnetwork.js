var Schema = mongoose.Schema;

var schema = new Schema({
  _id: {type: String, default: mongoose.Types.ObjectId().toString()},
  idproject: String,
  idnetwork: String,
  name: String,
  idagent: String,
});

var SubnetworkModel = mongoose.model('subnetwork', schema, 'subnetwork');

module.exports = SubnetworkModel;
