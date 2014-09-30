var cp = require('child_process');
var logger = require('./logger.js')
var fs = require('fs');
var dns = require('./ip2hostname.js');

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

module.exports = function (device, ip, callback) {

var process = cp.spawn(settings.arpingcmd, ['-c 1', '-w 2', '-I', device, ip]);

//console.debug("/usr/bin/arping -c 1 -w 2 -I " + device + " " + ip);

logger.debug("arping working on " + device + " " + ip);

//console.log(process.stderr);
//console.log(process.stdout);

process.on('close', function (code) {
  logger.debug('arping child process for ' + ip + ' exited with code ' + code);
});

process.stderr.on('data', function (data) {
  logger.error('arping stderr: ' + data);
});

process.stdout.on('data', function (data, status) {

    var status = null;
    var latency = null;
    var result_line = 1;
    var time_param = 6;
    var mac ;

    // Split the returned output by line.
    var lines = data.toString().split('\n');

    // Split the result line into an array.
    var array = lines[result_line].split(' ');

    //console.log(array[time_param]);

    if (!array[time_param]) {
      status = false;
      mac = "";
      latency = 0;
    }
    else {
      status = true;
      var ipv4Pattern = new RegExp(/^\[(.*)\]$/);

      mac = array[4].match(ipv4Pattern)[1];
    }

    var date = new Date();
    var ts = String(Math.round((Date.now() / 1000)));

    dns(ip, function (hostname) {

        logger.debug("arping function: invoking dns " + ip + ", result hostname " + hostname);

        var result = { "ip": ip , "hostname": hostname, "status": status, "mac": mac, "ts": ts };

        callback && callback(result, status);

      }
    );

  });

}
