<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

$video_id = $_POST['video_id'];
$user_id = $_POST['user_id'];
$comment = $_POST['comment'];

$sql = "INSERT INTO Comments (video_id, user_id, comment) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $video_id, $user_id, $comment);
$stmt->execute();

echo json_encode(["status" => "success"]);

$stmt->close();
$conn->close();
?>
