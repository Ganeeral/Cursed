<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $videoId = $data['id'];

    if ($videoId <= 0) {
        echo json_encode(["success" => false, "message" => "Некорректный ID видео."]);
        exit;
    }

    $sql = "DELETE FROM reports WHERE video_id = ?";
    $statement = $conn->prepare($sql);
    if (!$statement) {
        echo json_encode(["success" => false, "message" => "Ошибка подготовки запроса."]);
        $conn->close();
        exit;
    }

    $statement->bind_param("i", $videoId);

    if ($statement->execute()) {
        echo json_encode(["success" => true, "message" => "Жалобы успешно удалены"]);
    } else {
        echo json_encode(["success" => false, "message" => "Ошибка удаления жалоб."]);
    }

    $statement->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Некорректный метод запроса."]);
}
?>
