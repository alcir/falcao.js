falcao.js
=========
**beta**

IP Address and MAC address Tracker / Monitor

The idea behind this tool, is inspired by an old tool called Hawk (http://sourceforge.net/projects/iphawk/)

The node.js agent rely on the iputils arping tool. <br/>
For now I have tested the agent and the collector only on Linux (Debian and Ubuntu).

## Description

Falcao.js is a set of tools that help you to track, over time, the IP address usage in your network:

- IP address / MAC address association
- hostname association with IP addresses

By such, you can achieve these goals:

- track IP addresses that do not respond for a long time to ping, but that, in the DNS, are associated with an hostname, so you can reclaim them
- track IP addresses responding to ping, but that are not associated to any hostname in the DNS (rogue hosts, oversights)
- track MAC addresses, associated with IPs, seen on your network(s)

## Components

- one or more agents (one for each broadcast domain you want to monitor)
- a data collector
- a MySQL database (only one table)
- a PHP web interface

The agent and the collector are written in **Node.js**

## Manual, installation and configuration

Please read the wiki for more information: https://github.com/alcir/falcao.js/wiki

## Disclaimer

I cannot be named a Node.js or a PHP programmer. I've written this tool for my own educational purposes, and it is my final project for the edX [[CS50x|https://www.edx.org/course/harvardx/harvardx-cs50x-introduction-computer-1022]] course.

