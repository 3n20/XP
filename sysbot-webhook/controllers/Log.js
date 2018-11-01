var async = require("async");
var request = require('request');

function Log() { }

Log.prototype.Add = function (level, url, method, message, ip, meta, sendEmail) {

   async.parallel([function (callback) {
        console.log('send to log')
        var body = {
            level: level,
            url: url,
            method: method,
            message: message,
            ip: ip,
            meta: meta,
            sendEmail: sendEmail
        }
        var options = {
            method: "POST",
            url: process.env.URL_LOGS,
            json: body
        };

        request(options, function (err, response, body) {
            return;
        });
   }]);

};

module.exports = new Log();