<?php

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres';
$password = 'secret';

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname";

try {
    $db = new PDO($dsn, $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}

catch (Exception $e) {
    echo "An error has occured when connecting to db" . $e->getMessage();
}

?>