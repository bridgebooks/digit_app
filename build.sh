#!/bin/bash
# Deployment script

git pull

yarn install

ng build --prod --base-href / --env=prod

yarn start
