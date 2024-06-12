<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

if (!$user_id) {
    echo json_encode([]);
    exit;
}

$query = "
  SELECT videos.*, users.username as author_username 
  FROM videos
  JOIN Videolikes ON videos.id = Videolikes.video_id
  JOIN users ON videos.author= users.id
  WHERE Videolikes.user_id = ?
";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$likedVideos = [];
while ($row = $result->fetch_assoc()) {
    $likedVideos[] = $row;
}

echo json_encode($likedVideos);

$stmt->close();
$conn->close();
?>
