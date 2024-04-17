#!/bin/bash

EXEC_PATH=$(dirname $(readlink -f "$0"))
HOME_PATH=$EXEC_PATH/..

export GIT_SSH_COMMAND='ssh -i ~/.ssh/gitlab -o StrictHostKeyChecking=no -o LogLevel=ERROR'
git config --global --add safe.directory /home/volume
git lfs install --force
git lfs pull

if [ ! -d "$HOME_PATH/node_modules"  ]; then
    npm install
fi
