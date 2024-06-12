<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$video_id = $data['video_id'];
$user_id = $data['user_id'];

// Проверка, смотрел ли пользователь уже это видео
$query = $conn->prepare("SELECT COUNT(*) FROM video_views WHERE video_id = ? AND user_id = ?");
$query->bind_param('ii', $video_id, $user_id);
$query->execute();
$query->bind_result($viewsCount);
$query->fetch();
$query->close();

if ($viewsCount == 0) {
    // Если пользователь еще не смотрел это видео, добавляем запись о просмотре и обновляем счетчик
    $insertQuery = $conn->prepare("INSERT INTO video_views (video_id, user_id) VALUES (?, ?)");
    $insertQuery->bind_param('ii', $video_id, $user_id);
    $insertQuery->execute();
    $insertQuery->close();

    $updateQuery = $conn->prepare("UPDATE videos SET views = views + 1 WHERE id = ?");
    $updateQuery->bind_param('i', $video_id);
    $updateQuery->execute();
    $updateQuery->close();
}

echo json_encode(['success' => true]);
?>
