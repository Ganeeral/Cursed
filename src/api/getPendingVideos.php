<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$sql = "SELECT * FROM PendingVideos";
$result = $conn->query($sql);

$videos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $videos[] = $row;
    }
}

$conn->close();

echo json_encode($videos);
?>
