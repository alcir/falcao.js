var arPing = require('./arping.js')
var agent = require('./agent.js')
var logger = require('./logger.js')

var Netmask = require('netmask').Netmask

var addressSpace = process.argv[2];
var ethDevice = process.argv[3];

/*
var ipv4Pattern = new RegExp(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/);

var patternMatch = addressSpace.match(ipv4Pattern);

 for (var i = 0; i < 4; i++) {
  console.log(parseInt(patternMatch[i + 1]));
}
*/

var block = new Netmask(addressSpace);

logger.debug("Start " + block.first);
logger.debug("Stop " + block.last);

//block.forEach(function(ip, long, index));

block.forEach(function (ip) {
  //console.log(ip)
  //function (device, ip, callback) {
  arPing(ethDevice, ip, function(data, status) {

    //if (data.status == true) {
      agent(data)
    //}

    //console.log(" + " + status)
  })
});
