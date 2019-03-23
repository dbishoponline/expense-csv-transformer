#!/bin/bash

# include common functions
source "./scripts/_common.sh"

# compile the project
node dist/index.js $1 $2
