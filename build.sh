#!/bin/sh
# Builds extension.js from the committed src/themes/blueprint.css.
# Needs nothing outside this directory: the public repository that Roam Depot
# builds is a mirror of plugin/, and Depot runs this file as its root build.sh.
set -eu
cd "$(dirname "$0")"

npm ci
npm run build
