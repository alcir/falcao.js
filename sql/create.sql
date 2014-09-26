CREATE TABLE `probes` (
  `mac` char(17) NOT NULL DEFAULT '',
  `ip` char(12) NOT NULL,
  `hostname` char(253) NOT NULL DEFAULT '',
  `firstseen` int(11) DEFAULT NULL,
  `lastseen` int(11) DEFAULT NULL,
  `lastcheck` int(11) DEFAULT NULL,
  PRIMARY KEY (`mac`,`ip`,`hostname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

