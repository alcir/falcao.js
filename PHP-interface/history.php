<?php

    // configuration
    require("./includes/config.php"); 

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "GET")
    {
        $positions = query("SELECT mac,ip,hostname,firstseen,lastseen FROM probes where ip = ? order by lastseen DESC", $_REQUEST["ip"]);
        
        render("history_display.php", [ "title" => "History", "ip" => $_REQUEST["ip"], "positions" => $positions ]);
    }
    else
    {
        // else render form
        render("main.php", ["title" => "Main"]);
    }

?>
