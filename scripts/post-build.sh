#!/bin/bash

# Move HTML files to root
mv dist/src/popup/index.html dist/popup.html
mv dist/src/options/index.html dist/options.html

# Remove empty directories
rm -rf dist/src
