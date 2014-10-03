<form method="get" action="index.php">
    <fieldset>
        <div class="form-group">
            <input autofocus="" class="form-control" name="network" placeholder="x.x.x.x/y" 
            <?php
                if (isset($_REQUEST["network"]))
                {
                    print "value=\"".$_REQUEST["network"]."\"";
                }
            ?>
            type="text">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-default">Get</button>
        </div>
    </fieldset>
</form>

<?php

    if (isset($_REQUEST["network"]))
    {
        if ($_REQUEST["network"] != '')
        {
            // initialize object
            $ipv4 = new Net_IPv4();
            
            $net = preg_split("/[\/]/", $_REQUEST["network"]);
                        
            // validate IP address
            //echo $ipv4->validateIp($net[0]) ? "IP is valid" : "IP is invalid";

            if ($ipv4->validateIp($net[0]) && ($net[1] > 0 && $net[1] < 33))
            {
                include("show.php");
            }
            else
            {
                render("apology.php", ["message" => "The provided CIDR is invalid." ]);
            }
        }
    }

?>

</table>
