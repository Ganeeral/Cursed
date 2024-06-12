<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $video_id = $data['video_id'];
    $reporter_id = $data['user_id'];
    $reason = $data['reason'];
    $report_date = date('Y-m-d');

    if ($conn->connect_error) {
        die('Ошибка подключения к базе данных: ' . $conn->connect_error);
    }

    $sql = "INSERT INTO Reports (video_id, reporter_id, reason, report_date) VALUES ('$video_id', '$reporter_id', '$reason', '$report_date')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Жалоба успешно отправлена"]);
    } else {
        echo json_encode(["error" => "Ошибка при отправке жалобы: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
