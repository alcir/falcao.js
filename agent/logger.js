var winston = require('winston');
var fs = require('fs');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'info' }),
    new (winston.transports.File)({ filename: 'logs/all-logs.log' })
  ]/*,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]*/
});

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

module.exports.transports.console.level = settings.loglevel;
