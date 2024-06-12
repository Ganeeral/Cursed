<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$video_id = $data['video_id'];

if (!$user_id || !$video_id) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$query = "DELETE FROM video_views WHERE user_id = ? AND video_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Video not found in history']);
}

$stmt->close();
$conn->close();
?>
