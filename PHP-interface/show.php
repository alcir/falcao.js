<p class="help-block">Showing <?= $_REQUEST["network"] ?></p>

<table class="table table-striped">
    <thead>
        <tr>
            <th>IP</th>
            <th>hostname</th>
            <th>last MAC</th>
            <th>first contact</th>
            <th>last contact</th>
            <th></th>
        </tr>
    </thead>

<?php

	//$positions = query("SELECT mac,ip,hostname,firstseen,MAX(lastseen) as lastseen FROM probes group by mac,ip order by INET_ATON(ip)");

    $positions = query("select t.mac, t.ip, t.hostname, t.firstseen, t.lastseen, t.lastcheck from probes t, (select ip, max(lastseen) as k from probes group by ip) tmp where t.ip=tmp.ip and t.lastseen=tmp.k order by INET_ATON(t.ip)");

    //	print_r($_REQUEST);

    $network = $_REQUEST["network"];

    $array = iprange($network);
  
    foreach ($array as $ip)
    {
        print("<tr>");
        print("<td><a href='history.php?ip=" . $ip . "'/>" . $ip ."</td>");
	   // print("<td>" . gethostbyaddr($ip) . "</td>");
  
        $found = 0;
        $i = 0;
        
        while ( $i < count($positions) && $found == 0)
        {    
            $position = $positions[$i];
            if ($position["ip"] == $ip)
            {
                //print("<td>" . $position["ip"] . "</td>");
		        print("<td>" . $position["hostname"] . "</td>");
		        print("<td>" . $position["mac"] . "</td>");
		        print("<td>" . dateCalc($position["firstseen"]) . "</td>");
		        //print("<td>" . date('d M Y G:i:s', $position["lastseen"]) ."</td>");
			    print("<td>" . dateCalc($position["lastseen"]) ."</td>");
		        print("<td>" . "<img width=20 src='" . status($position["hostname"], $position["lastseen"]) . "'/>" . "</td>");
		        $found=1;
            }
            
            $i++;
        }

        if ($found == 0)
        {
            //print("<td>" . $position["ip"] . "</td>");
           // print("<td><b>" . $found. "</b></td>");
            print("<td> - </td>");
	        print("<td> - </td>");
		    print("<td> - </td>");
	        print("<td>" . "<img width=20 src='" . status("-", 0) . "'/>" . "</td>");
        }

        print("</tr>");        
    }

  //  print_r($positions[0]);
  /*
    
    
	foreach ($positions as $position)
		{
		   
		    print("<tr>");
		    print("<td>" . $position["ip"] . "</td>");
		    print("<td>" . gethostbyaddr($position["ip"]) . "</td>");
		    print("<td>" . $position["mac"] ."</td>");
		    print("<td>" . date('d M Y G:i:s', $position["firstseen"]) . "</td>");
		    //print("<td>" . date('d M Y G:i:s', $position["lastseen"]) ."</td>");
			print("<td>" . $position["lastseen"] ."</td>");
		    print("<td>" . "<img width=20 src='" . status($position["lastseen"]) . "'/>" . "</td>");
		    print("</tr>");
		}
		
    */
    
?>
