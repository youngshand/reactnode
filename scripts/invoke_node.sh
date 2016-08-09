#!/bin/bash

export PORT=3001;
export DEBUG=false;
export ENV=production;

cd /home/site/public_html;

echo "Running NPM install";
npm install;

echo "Running NPM deploy script";
npm run deploy;
