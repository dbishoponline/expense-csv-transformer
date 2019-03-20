#!/bin/bash

build() {
  if ! babel --presets @babel/preset-env -d dist/ src/ ; then
    echo 'Error: Unable to compile the source files to dist/'
  fi
}

debug() {
  if ! node --inspect-brk ./dist/index.js ; then
    echo 'Error: Unable to start the debugger...'
  fi
}

test() {
  if ! nyc --reporter=lcov --reporter=text-lcov ava --watch --verbose ; then
    echo 'Error: Unable to start test runner...'
  fi
}
