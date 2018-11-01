var Schema = mongoose.Schema;

var investimentos = new Schema({
    fundos: [],
    tesouro: [],
    idUser: String,
    ativo: Boolean
});
var InvestimentoModel = mongoose.model('investimentos', investimentos, 'investimentos');
module.exports = InvestimentoModel;