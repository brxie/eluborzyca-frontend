#!/bin/bash

TAG=latest
REPO_NAME=2e0253b64a8/frontend

docker build -t $REPO_NAME .
docker push $REPO_NAME:$TAG

