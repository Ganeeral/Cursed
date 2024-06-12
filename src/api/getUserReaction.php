<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->video_id)) {
    echo json_encode(["reaction" => null]);
    exit();
}

$user_id = $data->user_id;
$video_id = $data->video_id;

$query = "SELECT type FROM likes WHERE user_id = ? AND video_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();
$stmt->bind_result($reaction);
$stmt->fetch();
$stmt->close();

echo json_encode(["reaction" => $reaction]);

$conn->close();
?>
