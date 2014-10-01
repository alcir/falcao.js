var arPing = require('./arping.js')
var AGENT = require('./agent.js')
var logger = require('./logger.js')
var Netmask = require('netmask').Netmask

var addressSpace = process.argv[2];
var ethDevice = process.argv[3];

var agent = new AGENT();
var client = agent.connect();

var block = new Netmask(addressSpace);

logger.info("[index] Start: " + block.first + " End: "+ block.last);

block.forEach(function (ip) {

  arPing(ethDevice, ip, function(data, status) {

    agent.write(data,client);

  })
});

logger.debug("[index] Foreach ip end");
