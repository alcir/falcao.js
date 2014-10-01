var path = require('path');
var net = require('net');
var fs = require('fs');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync(__dirname + '/config.json', encoding="ascii"));

module.exports = function() {

  this.connect = function() {

    var client = new net.Socket();

    client.setTimeout(5000);
    client.setNoDelay(true);

    client.connect(settings.collectorport, settings.collectorhost, function() {

      logger.info('[agent] Connected to: ' + settings.collectorhost + ':' + settings.collectorport);

    });

    client.on('error', function(err) {

      logger.error('[agent] error: ', err.message);

    });

    client.on('timeout', function() {

      logger.debug('[agent] Socket timeout: I assume there no more data to send.' );

      // Close the client socket completely
      client.destroy();

    });

    // Add a 'close' event handler for the client socket
    client.on('close', function() {

      logger.info('[agent] Connection closed');

    });

    return client;

  }

  this.write = function(data, client) {
    logger.debug("writing " + JSON.stringify(data) );
    client.write(JSON.stringify(data) + ";");
  }
}
