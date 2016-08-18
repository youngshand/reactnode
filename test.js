// triggers unit tests in both the functional and unit test folders
import React from 'react';
import childProcess from 'child_process';

// var spawn = require('child_process').spawn;
let exitCode = 0;

// run mocha tests
const mocha = childProcess.spawn('mocha' , [
  '--compilers', 'js:babel-core/register', './src/**/tests/*.unit.js',
]);

mocha.stdout.pipe(process.stdout)
mocha.stderr.pipe(process.stderr)

mocha.on('exit', (code) => {
  // update exit code if a test failed
  if (code !== 0) exitCode = code;

  // run nightwatch tests
  // var nightwatch = spawn('nightwatch');

  // nightwatch.stdout.pipe(process.stdout)
  // nightwatch.stderr.pipe(process.stderr)

  // nightwatch.on('exit', function (code) {
  //   // update exit code if test failed
  //   if (code !== 0) exitCode = code;
    process.exit(exitCode);
  // })
});
