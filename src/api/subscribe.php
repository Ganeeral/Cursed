<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$subscriber_id = $data['subscriber_id'];
$channel_id = $data['channel_id'];

if (empty($subscriber_id) || empty($channel_id) || $subscriber_id == $channel_id) {
    echo json_encode(['message' => 'Invalid input']);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM Subscriptions WHERE subscriber_id = ? AND channel_id = ?");
$stmt->bind_param("ii", $subscriber_id, $channel_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['message' => 'Already subscribed']);
    $stmt->close();
    $conn->close();
    exit();
}

$stmt->close();

$stmt = $conn->prepare("INSERT INTO Subscriptions (subscriber_id, channel_id, subscribed_at) VALUES (?, ?, NOW())");
$stmt->bind_param("ii", $subscriber_id, $channel_id);

if ($stmt->execute()) {
    $stmt = $conn->prepare("UPDATE users SET subscribers = subscribers + 1 WHERE id = ?");
    $stmt->bind_param("i", $channel_id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['message' => 'Subscribed successfully']);
} else {
    echo json_encode(['message' => 'Subscription failed']);
}

$conn->close();
?>
