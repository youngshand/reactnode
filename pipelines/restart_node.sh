
export "RESTARTING NODE SERVER";
# restart the node server
ssh $USER@$HOST '(pm2 startOrRestart /home/$USER/public_html/process.json)'
