let Config                      = require('../config/config');
exports.environmentConfig       = function environmentConfig(env){
	Config.forEach(function(conf){
        env.portaSysbot         = conf.sysbot.port;//inicio environment sysbot
        env.conversation_user   = conf.sysbot.conversationUser;
        env.conversation_pass   = conf.sysbot.conversationPass;
        env.url_autenticador    = conf.sysbot.urlAutenticador;
        env.urlSysbotCentralApi = conf.sysbot.urlCentralApi;
        env.urlSysbotLogs       = conf.sysbot.urlLogs;
        env.apiTd             	= conf.sysbot.ApiTd;
        env.apiFundos          	= conf.sysbot.ApiFundos;
        env.apiUserInfo       	= conf.sysbot.ApiUserInfo;
        env.portAutenticador    = conf.autenticador.port;//inicio environment autenticador
		env.urlSysbot           = conf.autenticador.urlSysbot;
		env.urlWebhook          = conf.autenticador.urlWebhook;
		env.tokenWebhook        = conf.autenticador.tokenWebhook;
		env.tokenSysbot         = conf.autenticador.tokenSysbot;
        env.urlLogsAutenticador = conf.autenticador.urlLogs;//
        env.portCentralApi    	= conf.centralApi.port;//inicio environment central api
		env.urlCentralApiLogs   = conf.centralApi.urlLogs;
		env.token               = conf.centralApi.token;
		env.loginEmail          = conf.centralApi.loginEmail;
		env.passwordEmail       = conf.centralApi.passwordEmail;
		env.hostEmail           = conf.centralApi.hostEmail;
		env.portEmail           = conf.centralApi.portEmail;
		env.FromEmail           = conf.centralApi.FromEmail;
		env.toEmail             = conf.centralApi.toEmail;
		env.subjectEmail        = conf.centralApi.subjectEmail;
		env.urlAuthentication   = conf.centralApi.urlAuthentication;
		env.ApplicationName     = conf.centralApi.ApplicationName;
		env.urlUserSignature    = conf.centralApi.urlUserSignature;
        env.urlUserPassword     = conf.centralApi.urlUserPassword;	
        env.portDashboard       = conf.dashboard.port;//inicio environment dashboard
		env.urlDashboardLogs    = conf.dashboard.urlLogs;
		env.urlCentralApi       = conf.dashboard.urlCentralApi;
		env.connectionString    = conf.dashboard.connectionString;
		env.toneUser            = conf.dashboard.toneUser;
        env.TonePass            = conf.dashboard.TonePass;
        env.portLogs            = conf.logs.port;//inicio environment logs	
        env.portWebhook         = conf.webhook.port;//inicio environment webhook
		env.urlAutenticador     = conf.webhook.urlAutenticador;
		env.tokenWebApp         = conf.webhook.tokenWebApp;
		env.tokenAutenticador   = conf.webhook.tokenAutenticador;
		env.urlWebhookLogs      = conf.webhook.urlLogs;	
    });    
    return env;
}