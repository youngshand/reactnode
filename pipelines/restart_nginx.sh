# For this script to work the files in the sudoers dir need to be installed on to the server
# for more instructions see the files:
# /pipelines/sudoers/sudo_nginx_test
# /pipelines/sudoers/sudo_nginx_reload


# test nginx
echo "";
echo "TESTING NIGNX";
echo "=============";

ssh $USER@$HOST '(sudo /usr/local/sbin/sudo_nginx_test)'

if [ $? -ne 0 ];
then
    # testing the new config failed, fallback to the old one
    echo 'Error in generated nginx config';

    # the fallback will attempt to restart nginx
    # this check allows us to prevent a fallback loop
    # when both the deployed and fallback code fail to start the server
    if [ "$FALLBACK" == "dirty" ]
    then
        echo "";
        echo "FALLBACK HAS ALREADY BEEN ATTEMPTED AND FAILED";
        echo "==============================================";
    else
        bash $BITBUCKET_CLONE_DIR/pipelines/_fallback.sh;
    fi

    exit 1;
fi

# restart nginx
echo "";
echo "RESTARTING NIGNX";
echo "================";

ssh $USER@$HOST '(sudo /usr/local/sbin/sudo_nginx_reload)'

if [ $? -ne 0 ];
then
    # restarting server failed
    echo '';
    echo 'ERROR WHEN RESTARTING NINGX';
    echo '===========================';
    exit 1;
fi
