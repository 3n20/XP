function systemController() { }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

systemController.prototype.autentica = function (req, res, next) {
    var user = req.body
    console.log(JSON.stringify(user));

    if(user) {
        MongoClient.connect(url + 'sysbot_adm', function (err, db) {
            if (err) throw err;
            db.collection("users").find(user).toArray(function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    res.statusCode = 401;
                    db.close();
                    next()
                }
                else {
                    var user = {
                        auth: true,
                        level: result[0].level,
                        login: result[0].login
                    }
                    console.log(result)
                    req.body.user = user
                }
                db.close();
                next()
            });
        });
    }else{
        var user = {
            auth: false
        }
        req.body.user = user
    }
}


module.exports = new systemController();