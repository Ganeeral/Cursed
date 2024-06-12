<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

if (empty($user_id)) {
    echo json_encode(['message' => 'user_id обязателен']);
    exit();
}

$stmt = $conn->prepare("SELECT username FROM users WHERE id = ?");
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    $author = $user['username'];

    $stmt = $conn->prepare("SELECT v.id, v.title, v.preview, v.publication_date, v.views, u.username, u.author_avatar 
        FROM videos v 
        JOIN users u ON v.author = u.id 
        WHERE u.id = ?");
    $stmt->bind_param("s", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $videos = $result->fetch_all(MYSQLI_ASSOC);
    
    if ($videos) {
        echo json_encode($videos);
    } else {
        echo json_encode([]);
    }

} else {
    echo json_encode(["error" => "Пользователь не найден"]);
}

$stmt->close();
$conn->close();
?>
