export PORT=3001;
export DEBUG=false;
export ENV=$DEPLOYMENT_GROUP_NAME;

export PORT=3001;
#!/bin/bash
service httpd start

mkdir /home/site/logs && cd /home/logs && touch pm2-out.log pm2-err.log

echo 'Starting PM2 Server'

sh /home/site/start.sh
