<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$videoId = $_GET['id'];
$userId = $_GET['user_id'];

$sql = "SELECT author FROM videos WHERE id = $videoId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row["author"] == $userId) {
        $authorized = true;
    } else {
        $authorized = false;
    }
} else {
    $authorized = false;
}

$conn->close();

echo json_encode(array("authorized" => $authorized));
?>
