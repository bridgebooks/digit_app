#!/bin/bash
# Deployment script

git pull

yarn install

ng build --prod --env=prod

yarn start
