var net = require('net');
var fs = require('fs');
var mysql = require('./mysql.js');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync(__dirname + '/config.json', encoding="ascii"));

var options = { allowHalfOpen: true };

// 'connection' listener
var server = net.createServer(options, function(c) {

  logger.info('[index] ' + c.remoteAddress + ' connected');

  //c.write('hello\r\n');
  //c.pipe(c);
  //console.log(c);

  c.on('error', function (err) {
    logger.error('[index] server error: ' + err.stack);
  });

  c.on('end', function() {
    logger.info("[index] " + c.remoteAddress + " disconnected");
  });


  // this is only for logging purposes
  c.once('data', function() {
    logger.info("[index] " + c.remoteAddress + " sending data");
  });

  c.on('data', function(data) {

    // copy and paste from
    // http://stackoverflow.com/questions/12872563/issues-when-reading-a-string-from-tcp-socket-in-node-js

    var chunk = "";
    chunk += data.toString(); // Add string on the end of the variable 'chunk'
    d_index = chunk.indexOf(';'); // Find the delimiter
    logger.debug("[index] chunk " + chunk.toString());

    // While loop to keep going until no delimiter can be found
    while (d_index > -1) {
      try {

        // Create string up until the delimiter
        string = chunk.substring(0,d_index);

        // Parse the current string
        json = JSON.parse(string);

        // Function that does something with the current chunk of valid json.
        logger.debug("[index] invoking mysql module for " + json.ip);

        mysql(JSON.stringify(json));

      } catch (er) {
          logger.debug("[index] while catch er, continue ");
          continue;
      }

      // Cuts off the processed chunk
      chunk = chunk.substring(d_index+1);

      // Find the new delimiter
      d_index = chunk.indexOf(';');

    }

    //

  });
});

server.listen(settings.listenport, function() {
  logger.info('[index] server bound');
});

server.on('error', function (err) {
  if (err.code == 'EADDRINUSE') {
    logger.error('[index] Port already in use');
  } else {
    logger.error('[index] server error: ' + err.stack);
  }
});
