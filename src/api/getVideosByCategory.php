<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 1;

if ($category_id === 1) {
    $sql = "SELECT Videos.id, Videos.title, Videos.video_url, Videos.preview, Users.username AS author, Videos.publication_date, Videos.views, Videos.description, Users.author_avatar 
    FROM Videos 
    LEFT JOIN Users ON Videos.author = Users.id";
} else {
    $sql = "SELECT Videos.id, Videos.title, Videos.video_url, Videos.preview, Users.username AS author, Videos.publication_date, Videos.views, Videos.description, Users.author_avatar 
        FROM Videos 
        LEFT JOIN Users ON Videos.author = Users.id
        WHERE category_id = ?";
}

$stmt = $conn->prepare($sql);

if ($category_id !== 1) {
    $stmt->bind_param("i", $category_id);
}

$stmt->execute();
$result = $stmt->get_result();

$videos = array();
while ($row = $result->fetch_assoc()) {
    $videos[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($videos);
?>
