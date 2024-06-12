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

$query = "
    SELECT wh.id, wh.video_id, v.title, v.preview, users.username as author_username, v.publication_date
    FROM video_views wh
    JOIN videos v ON wh.video_id = v.id
    JOIN users ON wh.user_id = users.id
    WHERE wh.user_id = ?
    ORDER BY wh.viewed_at DESC
";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$videos = [];
while ($row = $result->fetch_assoc()) {
    $videos[] = $row;
}

echo json_encode($videos);

$stmt->close();
$conn->close();
?>
