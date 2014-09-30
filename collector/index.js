var net = require('net');
var fs = require('fs');
var mysql = require('./mysql.js');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

var options = { allowHalfOpen: false };

var server = net.createServer(options, function(c) { //'connection' listener
  //console.log('server connected');
  //c.write('hello\r\n');
  //c.pipe(c);
  //console.log(c);

  c.on('end', function() {
    logger.debug('index server disconnected');
  });

  c.on('data', function(data) {
    //logger.info(data);

    mysql(data);

    //c.end();

  });
});

server.listen(settings.listenport, function() { //'listening' listener
  logger.info('index server bound');
});
