

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.95">
    <title>--Poleana --> La Libertad de Ganar --</title>
    <!-- CDN LINKS -->
    <link rel="stylesheet" href="grid.css">
    <link rel="stylesheet" href="display.css">
    <link rel="stylesheet" href="navbar.css">
      
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    
  </head>
  
  <body>
  

  <div id="hijo"> 

  <section class="grid-layers">

            
          
          
    <?php

  require 'vendor/autoload.php';
  require_once 'config.php';


  $servername = $_ENV['MYDB_SERVER_NAME'];
  $username = $_ENV['MYDB_USER_NAME'];
  $password = $_ENV['MYDB_USER_PASSWORD'];
  $dbname = $_ENV['MY_DB_DATABASE'];
    
  /*
    // Establecer la conexión con la base de datos
    
    
      $servername = "localhost";
      $username = "cyboelsj_poleana";
      $password = "jugando33";
      $dbname = "cyboelsj_poleana";
      
  */

    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }
    
    // Realizar la consulta a la base de datos
    $sql = "SELECT apertura, cierre FROM casillas";
    $result = $conn->query($sql);
    
    // Generar el HTML
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo $row["apertura"] ;
            echo $row["cierre"] ;
        }
    } else {
        echo "No se encontraron registros.";
    }
    
    // Cerrar la conexión
    $conn->close();
    ?> 
      
      
      



  </body>




  <script src="inicializar.js"></script>
  <script src="play.js"></script>
  <script src="dados.js"></script>
  <script src="display.js"></script>




  <script type="JavaScript">

  /*///////////////////////
  /* Adjusting the size */
  /*/////////////////////*/


  $(document).ready(function(){


  var width = document.getElementById('hijo').offsetWidth;
              var height = document.getElementById('hijo').offsetHeight;
              var windowWidth = $(document).outerWidth();
              var windowHeight = $(document).outerHeight();
              var r = 1;
              r = Math.min(windowHeight / width, windowWidth / height);

              $('#hijo').css({
                  '-webkit-transform': 'scale(' + r + ')',
                  '-moz-transform': 'scale(' + r + ')',
                  '-ms-transform': 'scale(' + r + ')',
                  '-o-transform': 'scale(' + r + ')',
                  'transform': 'scale(' + r + ')'
              });
  });


  /***************************
  /* Positioning the coins */
  /*///////////////////////*/


  </script>




  </html>