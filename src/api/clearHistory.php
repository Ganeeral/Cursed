<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$query = "DELETE FROM video_views WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'No history found for user']);
}

$stmt->close();
$conn->close();
?>
