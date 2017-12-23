#!/bin/bash
# Deployment script

git pull

yarn install

./node_modules/.bin/ng build --prod --env=prod

yarn start
