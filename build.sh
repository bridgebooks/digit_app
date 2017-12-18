#!/bin/bash
# Deployment script

git pull

yarn install

ng build --prod --base-href /beta --env=prod

yarn start
