var winston = require('winston');
var fs = require('fs');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: __dirname + '/logs/all-logs.log', maxsize: 1024 * 1024 * 10, maxFiles: 5 })
  ]/*,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]*/
});

var settings = JSON.parse(fs.readFileSync(__dirname + '/config.json', encoding="ascii"));

module.exports.transports.console.level = settings.loglevel;
module.exports.transports.file.level = settings.loglevel;
