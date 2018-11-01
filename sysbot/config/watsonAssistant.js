let watson 	          = require('watson-developer-cloud');
let EnvironmentConfig = require('./EnvironmentConfig');
let env               = new Object();
EnvironmentConfig.environmentConfig(env);
let username          = env.conversation_user;
let password          = env.conversation_pass;
let version           = '2018-07-10';
let conversation      = new watson.AssistantV1({username, password, version});
module.exports        = conversation;