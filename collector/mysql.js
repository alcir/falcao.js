var sys = require('sys');
var fs = require('fs');
var mysql = require('mysql');
var logger = require('./logger.js')

var settings = JSON.parse(fs.readFileSync(__dirname + '/config.json', encoding="ascii"));

var pool = mysql.createPool({
  connectionLimit : 5,
  host     : settings.dbhost,
  database : settings.dbname,
  user     : settings.dbuser,
  password : settings.dbpass
});

module.exports = function (data) {

  //var jdata = JSON.parse(data);

  //logger.info("[mysql] data " + JSON.stringify(data));

  try {

      var jdata = JSON.parse(data);

  } catch (er) {

      logger.debug('[mysql] error parsing json, return. ' + JSON.stringify(data));
      return;

  }

  //var ts = "FROM_UNIXTIME(" + jdata.ts.toString() +")";

  var post  = { "mac": jdata.mac,
                "ip": jdata.ip,
                "hostname": jdata.hostname,
                "firstseen": jdata.ts.toString(),
                "lastseen": jdata.ts.toString(),
                "lastcheck": jdata.ts.toString(),
                "agent": jdata.agent.toString()
              };

  logger.debug("[mysql] " + jdata.ip + " arping status: " + jdata.status);

  if (jdata.status == false){
    post.lastseen="";
    post.firstseen="";
    var sql = "INSERT INTO probes SET ? ON DUPLICATE KEY UPDATE lastcheck=VALUES(lastcheck), agent=VALUES(agent)";
  } else {
    var sql = "INSERT INTO probes SET ? ON DUPLICATE KEY UPDATE mac=VALUES(mac), hostname=VALUES(hostname), lastseen=VALUES(lastseen), lastcheck=VALUES(lastcheck), agent=VALUES(agent)";
  }

  //logger.debug("post : " + jdata.hostname);

  pool.getConnection(function(err, connection) {
    if(err) {
      logger.error("mysql Pool Error: " + err.message);
      connection.end();
      return;
    }

    var query = connection.query(sql, post, function(err, result) {
      if(err) {
        logger.error("[mysql] ClientReady Error: " + err.message);
        connection.release();
        return;
      }
      logger.debug("[mysql] Executed query " + query.sql);
      connection.release();
    });
    
});


}
