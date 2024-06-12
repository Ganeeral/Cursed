<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'];
$password = $data['password'];

if (empty($login) || empty($password)) {
    echo json_encode(['message' => 'Все поля обязательны для заполнения']);
    exit();
}

$stmt = $conn->prepare("SELECT id, role, status, password FROM users WHERE login = ?");
$stmt->bind_param("s", $login);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(['message' => 'Пользователь не существует']);
    $stmt->close();
    $conn->close();
    exit();
}

$stmt->bind_result($user_id, $role, $status, $hashed_password);
$stmt->fetch();

if (password_verify($password, $hashed_password)) {
    echo json_encode(['message' => 'Вход выполнен успешно', 'user_id' => $user_id, 'role' => $role, 'status' => $status]);
} else {
    echo json_encode(['message' => 'Неверный логин или пароль']);
}

$stmt->close();
$conn->close();
?>
