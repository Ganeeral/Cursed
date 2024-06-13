<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $sticker_id = $data['sticker_id'];

    if ($sticker_id) {
        $sql = "DELETE FROM Stickers WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $sticker_id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Стикер успешно удален"]);
        } else {
            echo json_encode(["error" => "Ошибка при удалении стикера: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "ID стикера не указан"]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
