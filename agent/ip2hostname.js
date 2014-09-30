var dns = require('dns');
var logger = require('./logger.js')

module.exports = function (iptoresolve, callback) {

  dns.reverse(iptoresolve, function (err, hostname) {
    if (err) {

      logger.debug('ip2hostname.js ' + iptoresolve + ' message ' + err);
      var hostname = '-';

    }

    //console.log('reverse for : ' + JSON.stringify(domains));

    logger.debug('ip2hostname.js reverse for ' + iptoresolve + ': ' + hostname);

    callback && callback(hostname);

  });

};
