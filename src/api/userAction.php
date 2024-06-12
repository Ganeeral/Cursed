<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $data['userId'];
    $action = $data['action'];

    switch ($action) {
        case 'block':
            $sql = "UPDATE Users SET status = 'blocked' WHERE id = ?";
            break;
        case 'makeAdmin':
            $sql = "UPDATE Users SET role = 'admin' WHERE id = ?";
            break;
        case 'unblock':
            $sql = "UPDATE Users SET status = 'active' WHERE id = ?";
            break;
        default:
            echo json_encode(["error" => "Неизвестное действие"]);
            exit();
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Действие выполнено успешно"]);
    } else {
        echo json_encode(["error" => "Ошибка выполнения действия: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
