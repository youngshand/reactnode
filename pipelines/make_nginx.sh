
# generates a process.json file in the root of the project
# using the pipeline env vars

# make sure an env is set
if [ -z ${ENV+x} ] || ([ "$ENV" != "staging" ] && [ "$ENV" != "production" ])
then
    echo 'A staging or producion env needs to be set for nginx configs';
    echo 'Or edit the make_nginx.sh file to suit your projects needs';
    exit 1;
fi

# set nginx template vars
if [ "$ENV" == "staging" ]
then
    # put staging vars here
    listen="listen 80;
    listen 443 ssl;"

    admin="http://api.minterellison.beingbui.lt/";

    ssl="
    ssl on;
    ssl_certificate     /etc/nginx/ssl_beingbui.lt/*.beingbui.lt.crt;
    ssl_certificate_key /etc/nginx/ssl_beingbui.lt/*.beingbui.lt.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;";

    robots="
    location /robots.txt {
        alias /etc/nginx/robots/robots.txt;
    }";
fi

if [ "$ENV" == "producion" ]
then
    # put production vars here
    echo 'No production env vars have been set. Check the make_nginx.sh file.'
    exit 1;
fi

# option for turning off ssl
# this does not need to be set and is handy for testing feature branches
if [ "$SSL" == "off" ]
then
    listen="listen 80;";
    ssl="";
fi

# make the directory for nginx files
mkdir $BITBUCKET_CLONE_DIR/nginx;

# generate the nginx confing
# all references to $ which are not marking pipeline vars
# need to be escaped with a backslash, ie: \$http_host
cat >$BITBUCKET_CLONE_DIR/nginx/nginx.conf <<EOF
server {
    ${listen}

    server_name ${SERVER_NAME};

    rewrite ^/admin\$ ${admin} redirect;

    root /home/${USER}/public_html/dist;
    index index.html index.htm index.php;

    access_log /home/${USER}/logs/access.log;
    error_log /home/${USER}/logs/error.log;

    ${ssl}
    ${robots}

    client_max_body_size 4M;


    include /etc/nginx/error.conf;

    # node
    location / {
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header HOST \$http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header X-Forwarded-Proto true;
        proxy_pass http://127.0.0.1:${PORT};
        proxy_redirect off;
    }

    location ~* \.(ico|css|js|gif|jpe?g|png)(\?[0-9]+)?\$ {
        expires max;
        log_not_found off;
    }
}
EOF

if [ $? -ne 0 ];
then
    # template writing failed
    echo 'Writing nginx template file failed';
    exit 1;
fi


echo "GENERATED NGINX CONFIG";
echo "======================\n";

cat $BITBUCKET_CLONE_DIR/nginx/nginx.conf;
