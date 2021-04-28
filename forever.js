const forever = require('forever-monitor');

var child = new (forever.Monitor)('index.js', {
  'silent': false,
  'killTree': true,
  'outFile': __dirname + '/logs/logs.log',
  'errFile': __dirname + '/logs/errors.log'
});

child.on('restart:code', function(code) {
  console.error(`sciptr exited with code ${code}, restarting for the ${child.times}th time...`);
});

child.on('exit:code', function(code) {
  //var time = new Date().getTime();
  console.error(`[${new Date()}]sciprt exited with code ${code}`);
});

child.start();