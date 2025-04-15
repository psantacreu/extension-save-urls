#!/bin/bash

# Move HTML files to the correct location
mv dist/src/saved/index.html dist/saved.html
mv dist/src/options/index.html dist/options.html
mv dist/src/popup/index.html dist/popup.html

# Remove the src directory
rm -rf dist/src
