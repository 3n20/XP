function User(){};
let UserController = require('../controller/user');
let linq           = require('linq');
UserController.UserMemory();
User.prototype.ValidateFromWebhookToBot = function(req, res, next){
    console.log('User ValidateFromWebhookToBot');
    if (!_User)
        UserController.UserMemory();
        let _result = linq.from(_User).where("$._id == '" + req.body.meta.iduser + "' && $.idsubnetwork == '" + req.body.meta.idsubnetwork + "'").select().toArray();
    if (_result.length == 0) {
        console.log('Não obteve retorno pesquisa banco')
        console.log(req.subnetwork.idproject, req.subnetwork.idnetwork, req.subnetwork._id, req.body.meta.iduser)
        UserController.UserInsert(req.subnetwork.idproject, req.subnetwork.idnetwork, req.subnetwork._id, req.body.meta.iduser);        
    }else{
        console.log('Obteve retorno pesquisa banco')
        console.log('--' + req.subnetwork.idproject, req.subnetwork.idnetwork, req.subnetwork._id, req.body.meta.iduser)
    }
    next();
};
User.prototype.ValidateFromBotToWebhook = function (req, res, next) {
    console.log('User ValidateFromBotToWebhook')
    if(!_User)
        UserController.UserMemory();
        let _result = linq.from(_User).where("$.iduser == '" + req.body.meta.iduser + "' && $.idsubnetwork == '" + req.body.meta.idsubnetwork + "'").select().toArray();

    if (_result.length > 0 && req.body.user) {
        console.log('-->' + req.body.user.context)
        UserController.UserUpdate(req.body.meta.idsubnetwork, req.body.meta.iduser, req.body.user.context, req.body.user.particulary);
    } 
    next();
};
module.exports = new User();