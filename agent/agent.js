var path = require('path');
var net = require('net');
var fs = require('fs');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync(__dirname + '/config.json', encoding="ascii"));

module.exports = function() {

  this.connect = function() {

    var client = new net.Socket();

    client.connect(settings.collectorport, settings.collectorhost, function() {

        logger.debug('agent CONNECTED TO: ' + settings.collectorhost + ':' + settings.collectorport);

    });

    client.on('data', function(data) {

      logger.debug('agent DATA: ' + data);

    });

    client.on('timeout', function() {

      logger.debug('agent Socket timeout: I assume there no more data to send.' );
      // Close the client socket completely
      client.destroy();

    });

    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        logger.debug('agent Connection closed');
    });

    return client;
  }

  this.write = function(data, client) {
    client.write(JSON.stringify(data));
  }
}
