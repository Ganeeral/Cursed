<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

// Read JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$user_id = $data['user_id'];

$sql = "SELECT v.id, v.title, users.username as author_username , v.preview, v.publication_date 
        FROM WatchLater wl
        JOIN Videos v ON wl.video_id = v.id
        JOIN users ON v.author= users.id
        WHERE wl.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);

$response = array();
if ($stmt->execute()) {
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} else {
    $response['error'] = $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
