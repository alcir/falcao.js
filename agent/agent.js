var net = require('net');
var fs = require('fs');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

module.exports = function (data) {

  var client = net.connect(settings.agentport, settings.collectorhost);

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
