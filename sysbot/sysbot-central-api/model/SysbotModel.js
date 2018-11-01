let SysbotService = require('../services/SysbotService');
let Schema        = SysbotService.Schema;
let Context       = new Schema({
  dt_created: {type: Date},
  value: Object
}, {_id: false});
let schema = new Schema({
  idproject: String,
  idnetwork: String,
  idsubnetwork: String,
  iduser: String,
  context: Context,
  particulary: Object,
  dt_created: {type: Date},
  dt_updated: {type: Date, default: Date.now}
});
let SysbotModel = SysbotService.model('user', schema, 'user');
module.exports  = SysbotModel;