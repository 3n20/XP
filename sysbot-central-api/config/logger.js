function Logger(){};
Logger.prototype.Internal = function(req, res, next) {
    next();
    //Log.Add('info', req.originalUrl, 'Logger.Internal', 'Requisição efetuada.', req.ip, { obj: req.body });
};
Logger.prototype.External = function(req, res, next) {
    next();
    //Log.Add('info', req.originalUrl, 'Logger.External', 'Requisição efetuada.', req.ip, { obj: req.body });
};
module.exports = new Logger();