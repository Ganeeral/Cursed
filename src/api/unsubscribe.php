<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$subscriber_id = $data['subscriber_id'];
$channel_id = $data['channel_id'];

if (empty($subscriber_id) || empty($channel_id)) {
    echo json_encode(['message' => 'Invalid input']);
    exit();
}

$stmt = $conn->prepare("DELETE FROM Subscriptions WHERE subscriber_id = ? AND channel_id = ?");
$stmt->bind_param("ii", $subscriber_id, $channel_id);

if ($stmt->execute()) {
    $stmt = $conn->prepare("UPDATE users SET subscribers = subscribers - 1 WHERE id = ?");
    $stmt->bind_param("i", $channel_id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['message' => 'Unsubscribed successfully']);
} else {
    echo json_encode(['message' => 'Unsubscription failed']);
}

$conn->close();
?>
