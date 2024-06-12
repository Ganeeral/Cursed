<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$user_id = $data['user_id'];
$video_id = $data['video_id'];

$sql = "SELECT 1 FROM watchlater WHERE user_id = ? AND video_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();
$stmt->store_result();

$response = array();
$response['isSaved'] = $stmt->num_rows > 0;

$stmt->close();
$conn->close();

echo json_encode($response);
?>
