<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['subscriber_id']) || !isset($data['channel_id'])) {
    echo json_encode(['message' => 'Invalid input']);
    exit();
}

$subscriber_id = $data['subscriber_id'];
$channel_id = $data['channel_id'];

$stmt = $conn->prepare("SELECT * FROM Subscriptions WHERE subscriber_id = ? AND channel_id = ?");
$stmt->bind_param("ii", $subscriber_id, $channel_id);
$stmt->execute();
$stmt->store_result();

$response = [];
if ($stmt->num_rows > 0) {
    $response['subscribed'] = true;
} else {
    $response['subscribed'] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
