<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['user_id'])) {
    echo json_encode(['message' => 'Invalid input']);
    exit();
}

$user_id = $data['user_id'];

$stmt = $conn->prepare("SELECT channel_id FROM Subscriptions WHERE subscriber_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$channelIds = [];
while ($row = $result->fetch_assoc()) {
    $channelIds[] = $row['channel_id'];
}

$stmt->close();

// Получение информации о каждом пользователе
$subscribers = [];
foreach ($channelIds as $channelId) {
    $stmt = $conn->prepare("SELECT id, username, author_avatar, subscribers FROM users WHERE id = ?");
    $stmt->bind_param("i", $channelId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $subscribers[] = [
            'id' => $row['id'],
            'username' => $row['username'],
            'profile_picture' => $row['author_avatar'],
            'subscribers' => $row['subscribers'],
        ];
    }

    $stmt->close();
}

echo json_encode(['subscriptions' => $subscribers]);

$conn->close();
?>
