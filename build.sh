#!/bin/bash
# Deployment script

git pull origin dev

yarn install

./node_modules/.bin/ng build --prod --env=prod --aot --build-optimizer

yarn start
