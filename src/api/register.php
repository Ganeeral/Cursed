<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include("connect.php");

$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'];
$password = $data['password'];
$repeatPassword = $data['repeatPassword'];
$author_avatar = '/images/user.png';
$preview = '/images/business-8265025.jpg';

if (empty($login) || empty($password)) {
    echo json_encode(['message' => 'Все поля обязательны для заполнения']);
    exit();
}

if($password != $repeatPassword){
    echo json_encode(['message' => 'Пароли не совпадают']);
    exit();
}

$stmt = $conn->prepare("SELECT id FROM users WHERE login = ?");
$stmt->bind_param("s", $login);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['message' => 'Логин уже существует']);
    $stmt->close();
    $conn->close();
    exit();
}


$stmt->close();

$stmt = $conn->prepare("SELECT MAX(CAST(SUBSTRING(username, 6) AS UNSIGNED)) AS max_guest_num FROM users WHERE username LIKE 'гость %'");
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$max_guest_num = $row['max_guest_num'] ?? 0;
$new_guest_num = $max_guest_num + 1;
$username = "гость " . $new_guest_num;

$stmt->close();

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (login, password, username, author_avatar, preview) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $login, $hashed_password, $username, $author_avatar, $preview);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Регистрация успешна']);
}elseif($password != $repeatPassword){
    echo json_encode(['message' => 'Пароли не совпадают']);
    $stmt->close();
    $conn->close();
    exit();
}else {
    echo json_encode(['message' => 'Ошибка регистрации']);
}

$stmt->close();
$conn->close();
?>
