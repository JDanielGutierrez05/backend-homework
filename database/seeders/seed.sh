#!/bin/bash

COLOR_RED=$(tput setaf 1)
COLOR_DEFAULT=$(tput sgr0)

EXEC_PATH=$(dirname $(readlink -f "$0"))
cd $EXEC_PATH

export NODE_PATH=$(npm root --quiet -g)
node index.js
