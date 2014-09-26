var cp = require('child_process');
var logger = require('./logger.js')
var fs = require('fs');
var dns = require('./ip2hostname.js');

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

module.exports = function (device, ip, callback) {

var process = cp.spawn(settings.arpingcmd, ['-c 1', '-w 2', '-I', device, ip]);

//console.debug("/usr/bin/arping -c 1 -w 2 -I " + device + " " + ip);

logger.debug("working on " + device + " " + ip);

//console.log(process.stderr);
//console.log(process.stdout);

process.on('close', function (code) {
  logger.debug('child process for ' + ip + ' exited with code ' + code);
});

process.stderr.on('data', function (data) {
  logger.debug('stderr: ' + data);
});

process.stdout.on('data', function (data, status) {

    //console.log(" aaa " + data);

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

    //console.log(ts);
    dns(ip, function (hostname) {

        var result = { "ip": ip , "hostname": hostname, "status": status, "mac": mac, "ts": ts };

        logger.debug("----------------------- " + hostname);

        callback && callback(result, status);

      }
    );

  });

}

/*
exports.ping = function ping(callback) {

var address = "10.97.69.1";

var process = cp.spawn('/usr/bin/arping', ['-c 1', '-w 2', address]);

process.stdout.on('data', function (data) {
  var status = null;
  var latency = null;
  var result_line = 1;
  var time_param = 6;

  // Split the returned output by line.
  var lines = data.toString().split('\n');
  // Split the result line into an array.
  var array = lines[result_line].split(' ');
  // If the time parameter is not present, or the second line of output
  // contains 'Unreachable' or 'exceeded', mark as failure.
  if (!array[time_param] || array.indexOf('Sent') > -1) {
    status = false;
    latency = 0;
    console.log("no res");
  }
  console.log("a");
  callback && callback(array);

});

};
*/
