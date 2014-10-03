<?php

    require_once("constants.php");

    /**
     * Apologizes to user with message.
     */
    function apologize($message)
    {
        render("apology.php", ["message" => $message]);
        exit;
    }

    /**
     * Facilitates debugging by dumping contents of variable
     * to browser.
     */
    function dump($variable)
    {
        require("./templates/dump.php");
        exit;
    }


    /**
     * Executes SQL statement, possibly with parameters, returning
     * an array of all rows in result set or false on (non-fatal) error.
     */
    function query(/* $sql [, ... ] */)
    {
        // SQL statement
        $sql = func_get_arg(0);

        // parameters, if any
        $parameters = array_slice(func_get_args(), 1);

        // try to connect to database
        static $handle;
        if (!isset($handle))
        {
            try
            {
                // connect to database
                $handle = new PDO("mysql:dbname=" . DATABASE . ";host=" . SERVER, USERNAME, PASSWORD);

                // ensure that PDO::prepare returns false when passed invalid SQL
                $handle->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }
            catch (Exception $e)
            {
                // trigger (big, orange) error
                trigger_error($e->getMessage(), E_USER_ERROR);
                exit;
            }
        }

        // prepare SQL statement
        $statement = $handle->prepare($sql);
        if ($statement === false)
        {
            // trigger (big, orange) error
            trigger_error($handle->errorInfo()[2], E_USER_ERROR);
            exit;
        }

        // execute SQL statement
        $results = $statement->execute($parameters);

        // return result set's rows, if any
        if ($results !== false)
        {
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            return false;
        }
    }

    /**
     * Renders template, passing in values.
     */
    function render($template, $values = [])
    {
        // if template exists, render it
        if (file_exists("./templates/$template"))
        {
            // extract variables into local scope
            extract($values);

            // render header
            require("./templates/header.php");

            // render template
            require("./templates/$template");

            // render footer
            require("./templates/footer.php");
        }

        // else err
        else
        {
            trigger_error("Invalid template: $template", E_USER_ERROR);
        }
    }

    function status($hostname, $date)
    {
  		$now = time();

  		$diff = abs($now - $date);

  		$day = 1 * 24 * 60 * 60;

      //print("** ". $date." * " . $hostname . "** <br/>");

      if ( $date == 0 && $hostname == "-")
      {
          return WHITE;
      }
      else if ( $date == 0 && $hostname != "-")
      {
          return BLUE;
      }
      else if ($date != 0 && $hostname == "-")
      {
          return GREENBLUE;
      }
  		else if ($diff < $day) {
  		    return GREEN;
  		}
  		else if ($diff < $day * 10)
  		{
  		    return YELLOW;
  		}
  		else
  		{
  		    return RED;
  		}
    }

    function iprange($ip)
    {

      $array = array();

      list($ip, $netmask) = explode('/', $ip, 2);

      // create IPv4 object
      $ip_calc = new Net_IPv4();

      // set variables
      $ip_calc->ip = $ip;
      $ip_calc->bitmask = $netmask;

      $error = $ip_calc->calculate();

      if (is_object($error))
      {
        echo "An error occured: ".$error->getMessage();
      }

      $curr = ip2long($ip_calc->network)+1;

      while($curr < ip2long($ip_calc->broadcast) )
      {
        array_push($array,long2ip($curr));
        $curr += 1;
      }

      return $array;
    }

    function dateCalc($date)
    {
      if ($date != 0)
      {
          return date('d M Y G:i:s', $date);
      }
      else
      {
          return "never";
      }
    }
?>
