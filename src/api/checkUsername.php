<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include("connect.php");

$input = json_decode(file_get_contents('php://input'), true);
$login = $input['login'] ?? '';

$response = ['exists' => false];

if ($username) {
    $stmt = $conn->prepare("SELECT id FROM users WHERE login = ?");
    if ($stmt) {
        $stmt->bind_param("s", $login);
        $stmt->execute();
        $stmt->store_result();
        
        $response['exists'] = $stmt->num_rows > 0;
        
        $stmt->close();
    } else {
        $response['error'] = "Ошибка подготовки запроса";
    }
} else {
    $response['error'] = "Имя пользователя не указано";
}

$conn->close();

echo json_encode($response);
?>
