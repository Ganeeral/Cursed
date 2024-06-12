<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, username, role, DATE_FORMAT(created_at, '%d.%m.%Y') as date, preview FROM Users";
    $result = $conn->query($sql);

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);

    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
