<!--
la linea refresh, le indica al navegador dentro de cuantos seguundos (en este caso cero que significa instantaneamente) se ira a tal url (en este caso ivortex.html del mismo directorio)
!-->
<meta http-equiv="refresh" content="0;url=crear.html">

<?php
//Credenciales
$servername = "sql5.freesqldatabase.com";
$username = "sql5723954";
$password = "8bNKjjmTEj";
$dbname = "sql5723954";  
$mysqli = new mysqli($servername, $username, $password, $dbname);
//captura de datos pasados desde ivortex.html
$nombre = $_POST["nombre"];
$correo = $_POST["correo"];
$telefono = $_POST["telefono"];
//crear y ejecutar consulta php
$query="INSERT INTO Usuariosg (nombre,correo,telefono) VALUES('".$nombre."','".$correo."','".$telefono."')";
$mysqli->query($query) or die($mysqli->error.__LINE__);
?>
