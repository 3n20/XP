var UserController = require('../controller/user');
UserController.UserMemory();

function User() { }

User.prototype.ValidateFacebook = function (req, res, next) {
    console.log('User ValidateFacebook')

    var CONTEXT_EXPIRATION = 20; // Minutos
    var targetIdentity = req.body.entry[0].messaging[0].recipient.id;
    var platformUserId = req.body.entry[0].messaging[0].sender.id;

    if (!_User || !_UserBlocked)
        UserController.UserMemory();

    var _resultBlocked = linq.from(_UserBlocked).where("$.platform == 1 && $.bot == " + targetIdentity + " && $.user == " + platformUserId + "").select().toArray();
    if (_resultBlocked.length > 0){
        logger.info('User.ValidateFacebook','- Usuário bloqueado.', { obj: req });
        return res.sendStatus(401);
    }

    var _resultUserFacebook = linq.from(_User).where("$.platform == 1 && $.bot == " + targetIdentity + " && $.user == " + platformUserId + "").select().toArray();
    if (_resultUserFacebook.length > 0 && (_resultUserFacebook[0].context && _resultUserFacebook[0].context.value && moment().diff(_resultUserFacebook[0].context.created, 'minutes') <= CONTEXT_EXPIRATION)) {
        console.log('nao expirado')
        req._contextUserFacebook = _resultUserFacebook[0].context.value;
    }else {
        console.log('expirado')
        req._contextUserFacebook = null;
    }

    next();
};

User.prototype.ValidateFacebookBot = function (req, res, next) {
    console.log('User ValidateFacebookWho')

    var targetIdentity = req.body[0].targetIdentity;
    var platformUserId = req.body[0].userId;

    if (!_User || !_UserBlocked)
        UserController.UserMemory();

    var _resultBlocked = linq.from(_UserBlocked).where("$.platform == 1 && $.bot == " + targetIdentity + " && $.user == " + platformUserId + "").select().toArray();
    var _result = linq.from(_User).where("$.platform == 1 && $.bot == " + targetIdentity + " && $.user == " + platformUserId + "").select().toArray();

    if (_resultBlocked.length > 0){
        logger.info('User.ValidateFacebookBot','- Usuário bloqueado.', { obj: req });
        return res.sendStatus(401);
    }

    if ((req.body[0].context != "" || req.body[0].context != null) && _result.length == 0) {
        console.log('insert')
        UserController.UserInsert(1, targetIdentity, platformUserId, false, req.body[0].context);
    } else if ((req.body[0].context != "" || req.body[0].context != null) && _result.length > 0) {
        console.log('update')
        UserController.UserUpdate(_result[0]._id, false, req.body[0].context);
    }

    next();
};

module.exports = new User();
