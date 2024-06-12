<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

$video_id = $_GET['video_id'];

$sql = "SELECT c.comment, c.created_at, u.username, u.author_avatar, c.user_id
        FROM Comments c 
        JOIN Users u ON c.user_id = u.id 
        WHERE c.video_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $video_id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);

$stmt->close();
$conn->close();
?>
