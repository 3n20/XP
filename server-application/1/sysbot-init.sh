cd /opt/sysbot/sysbot-logs

forever start logs.js
cd /opt/sysbot/sysbot-dashboard

forever start dashboard.js
cd /opt/sysbot/sysbot-webapp

forever start webapp.js
cd /opt/sysbot/sysbot-webhook

forever start webhook.js
cd /opt/sysbot/sysbot-autenticador

forever start autenticador.js
cd /opt/sysbot/sysbot

forever start sysbot.js
cd /opt/sysbot/sysbot-central-api

forever start centralapi.js
forever list
