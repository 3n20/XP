'use strict';
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sysbot";
app.use(express.static(__dirname + '/views'));
app.post('/getSubnetwork', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        db.collection("subnetwork").findOne({}, function (err, result) {
            if (err) console.log(err);
            res.send(result._id);
            db.close();
        });
    });
});
var port = 3000;
app.listen(port, function () {
    console.log('WEBAPP on na porta: ' + port);
});