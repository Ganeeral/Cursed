<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}

$response = array();

    $data = json_decode(file_get_contents("php://input"), true);
    $videoId = $data['video_id'];
    if ($videoId <= 0) {
        $response['error'] = "Ошибка: Некорректный ID видео.";
        echo json_encode($response);
        exit;
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_flixx";

    $mysqli = new mysqli($servername, $username, $password, $dbname);
    if ($mysqli->connect_error) {
        $response['error'] = 'Ошибка подключения к базе данных: ' . $mysqli->connect_error;
        echo json_encode($response);
        exit;
    }

    $mysqli->begin_transaction();

    try {
        $sql = "DELETE FROM PendingVideos WHERE id = ?";
        $statement = $mysqli->prepare($sql);
        if (!$statement) {
            throw new Exception("Ошибка подготовки запроса: " . $mysqli->error);
        }
        $statement->bind_param("i", $videoId);
        $statement->execute();
        $statement->close();
        $mysqli->commit();
        $response['success'] = "Видео успешно удалено";
    } catch (Exception $e) {
        $mysqli->rollback();
        $response['error'] = "Ошибка удаления видео: " . $e->getMessage();
    }

    $mysqli->close();
echo json_encode($response);
?>
