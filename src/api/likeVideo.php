<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("connect.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->video_id) || !isset($data->type)) {
    echo json_encode(["message" => "Invalid input"]);
    exit();
}

$user_id = $data->user_id;
$video_id = $data->video_id;
$type = $data->type;

$query = "DELETE FROM Videolikes WHERE user_id = ? AND video_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $user_id, $video_id);
$stmt->execute();
$stmt->close();

$query = "INSERT INTO Videolikes (user_id, video_id, type) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iis", $user_id, $video_id, $type);

if ($stmt->execute()) {
    echo json_encode(["message" => "Success"]);
} else {
    echo json_encode(["message" => "Error"]);
}

$stmt->close();
$conn->close();
?>