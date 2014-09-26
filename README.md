falcao.js
=========
**beta**

IP Address and MAC address Tracker / Monitor

The idea behind this tool, is inspired, or is the same, of an old tool called Hawk (http://sourceforge.net/projects/iphawk/)


## Description

Falcao.js is a set of tools that help you to track, over time, the IP address usage in your network:

- IP address / MAC address association
- hostname association with IP addresses

By such, you can achieve these goals:

- track unused IP addresses that in the DNS seems to be associated with some hostname
- track MAC addresses, associated with IP, seen in your network
- track IP addresses responding to ping, but that are not associated to any hostname in the DNS

## Components

- one or more agents (one for each broadcast domain you want to monitor)
- a data collector
- a MySQL database (only one table)
- a PHP web interface

## Manual, installation and configuration

Please read the wiki for more informations: https://github.com/alcir/falcao.js/wiki
