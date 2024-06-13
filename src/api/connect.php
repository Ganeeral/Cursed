<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "stickers_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Ошибка подключения: ' . $conn->connect_error]));
}
?>