
# generates a process.json file in the root of the project
# using the pipeline env vars

cat >$BITBUCKET_CLONE_DIR/process.json <<EOF
{
  "apps" : [{
    "name" : "${USER?'Process config err: `USER` is not set'}",
    "script" : "/home/${USER}/public_html/lib/server/server.js",
    "error_file" : "/home/${USER}/logs/pm2-err.log",
    "out_file" : "/home/${USER}/logs/pm2-out.log",
    "cwd" : "/home/${USER}/public_html/",
    "source_map_support" : true,
    "env" : {
        "PORT": "${PORT?'Process config err: `PORT` is not set'}",
        "NODE_ENV": "${ENV?'Process config err: `ENV` is not set'}"
    }
  }]
}
EOF
