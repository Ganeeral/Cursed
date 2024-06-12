<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$sql = "SELECT * FROM Categories";
$result = $conn->query($sql);

$categories = array();
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

$conn->close();

echo json_encode($categories);
?>
