<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "db_flixx"; 

$mysqli = new mysqli($servername, $username, $password, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = $mysqli->real_escape_string($_GET['id']);
    $query = "
        SELECT 
            Videos.*, 
            Users.id AS author_id, 
            Users.username AS author, 
            Users.author_avatar AS author_avatar,
            Users.subscribers AS subscribers
        FROM Videos 
        LEFT JOIN Users ON Videos.author = Users.id 
        WHERE Videos.id = $id
    ";
    $result = $mysqli->query($query);

    if ($result) {
        $video = $result->fetch_assoc();
        if ($video) {
            echo json_encode($video);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Видео не найдено"));
        }
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Ошибка сервера"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Неправильный запрос"));
}

$mysqli->close();
?>
