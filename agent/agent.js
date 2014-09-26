var net = require('net');
var logger = require('./logger.js')

module.exports = function (data) {

  var client = net.connect(8124, 'localhost');

  client.timeout = 1;

  client.on('error', function(err) {
    logger.error('error:', err.message);
  });

  client.on('data', function(data) {
    client.end();
  });

  //console.log('xxx ' + data.ts);

  client.write(JSON.stringify(data));

}
