
# backup existing dir
ssh $USER@$HOST "rsync -avz --exclude '.git*' /home/$USER/public_html/. /home/$USER/rollback/"
# rsync changes
rsync -avz --exclude '(.git*|pipelines/*)' -e ssh $BITBUCKET_CLONE_DIR/. $USER@$HOST:/home/$USER/public_html/
# restart the node server
ssh $USER@$HOST '(pm2 startOrRestart /home/$USER/public_html/process.json)'
