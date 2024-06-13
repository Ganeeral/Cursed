<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['title']) || !isset($_FILES['preview'])) {
        echo json_encode(["error" => "Название и превью должны быть указаны"]);
        exit;
    }

    $title = $_POST['title'];
    $imageDir = "../../public/images/";

    $preview_tmp = $_FILES['preview']['tmp_name'];
    $preview = '/images/' . basename($_FILES['preview']['name']);

    if (move_uploaded_file($preview_tmp, $imageDir . basename($_FILES['preview']['name']))) {
        if ($conn->connect_error) {
            die('Ошибка подключения к базе данных: ' . $conn->connect_error);
        }

        $sql = "INSERT INTO Stickers (name, photo) VALUES ('$title', '$preview')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Стикер успешно добавлен"]);
        } else {
            echo json_encode(["error" => "Ошибка при добавлении стикера: " . $conn->error]);
        }

        $conn->close();
    } else {
        echo json_encode(["error" => "Ошибка при загрузке превью"]);
    }
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
