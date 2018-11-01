let Mongoose     = require('mongoose').Mongoose;
mongoose         = new Mongoose();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sysbot_chat', {useMongoClient: true, connectTimeoutMS: 1000});
module.exports   = mongoose;