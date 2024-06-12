<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$video_id = $_GET['video_id'];

$likes_query = "SELECT COUNT(*) as likes FROM VideoLikes WHERE video_id = ? AND type = 'like'";
$dislikes_query = "SELECT COUNT(*) as dislikes FROM VideoLikes WHERE video_id = ? AND type = 'dislike'";

$stmt = $conn->prepare($likes_query);
$stmt->bind_param('i', $video_id);
$stmt->execute();
$likes_result = $stmt->get_result()->fetch_assoc();

$stmt = $conn->prepare($dislikes_query);
$stmt->bind_param('i', $video_id);
$stmt->execute();
$dislikes_result = $stmt->get_result()->fetch_assoc();

$response = [
    'likes' => $likes_result['likes'],
    'dislikes' => $dislikes_result['dislikes']
];

echo json_encode($response);
?>
