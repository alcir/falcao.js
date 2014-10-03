<p class="help-block">Showing history for <?= $ip ?></p>

<a href="javascript:history.go(-1);">Back</a>

<table class="table table-striped">
    <thead>
        <tr>
            <th>last contact</th>
            <th>hostname</th>
            <th>MAC</th>
            <th>first contact</th>
            <th></th>
        </tr>
    </thead>
    
<?php

    //print_r($positions);


//    print("<td><a href='history.php?ip=" . $ip . "'/>" . $ip ."</td>");

    foreach ($positions as $position)
    {
        print("<tr>");
        print("<td>" . dateCalc($position["lastseen"]) ."</td>");
        print("<td>" . $position["hostname"] . "</td>");
        print("<td>" . $position["mac"] . "</td>");
        print("<td>" . dateCalc($position["firstseen"]) . "</td>");
        //print("<td>" . date('d M Y G:i:s', $position["lastseen"]) ."</td>");
        print("</tr>"); 
    }

    
    
?>
