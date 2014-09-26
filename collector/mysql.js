var sys = require('sys');
var fs = require('fs');
var mysql = require('mysql');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));

var pool = mysql.createPool({
  connectionLimit : 5,
  host     : settings.dbhost,
  database : settings.dbname,
  user     : settings.dbuser,
  password : settings.dbpass
});

module.exports = function (data) {

  var jdata = JSON.parse(data);

  //var ts = "FROM_UNIXTIME(" + jdata.ts.toString() +")";

  var post  = { "mac": jdata.mac,
                "ip": jdata.ip,
                "hostname": jdata.hostname,
                "firstseen": jdata.ts.toString(),
                "lastseen": jdata.ts.toString(),
                "lastcheck": jdata.ts.toString()
              };
logger.debug("ASSSSSSSSSSSSSSSSSSSSSSSSSSSSSssSTATUS : " + jdata.status);
  if (jdata.status == false) {
  //  logger.debug("STATUS : " + jdata.status);
    post.lastseen="";
    post.firstseen="";
  }

  //logger.debug("post : " + jdata.hostname);

  var sql = "INSERT INTO probes SET ? ON DUPLICATE KEY UPDATE mac=VALUES(mac), hostname=VALUES(hostname), lastseen=VALUES(lastseen), lastcheck=(lastcheck)";

  pool.getConnection(function(err, connection) {
    if(err) {
      logger.error("Pool Error: " + err.message);
      connection.end();
      return;
    }

    var query = connection.query(sql, post, function(err, result) {
      if(err) {
        logger.error("ClientReady Error: " + err.message);
        connection.release();
        return;
      }
      logger.debug("Executed query " + query.sql);
      connection.release();
    });
});


}
