<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $previewDir = "../../public/images/";
    $photo = "";

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $photo_tmp = $_FILES['photo']['tmp_name'];
        $photo = '/images/' . basename($_FILES['photo']['name']);
        move_uploaded_file($photo_tmp, $previewDir . basename($_FILES['photo']['name']));
    }

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Ошибка подключения к базе данных: ' . $conn->connect_error);
    }

    $sql = "UPDATE Stickers SET name='$name'";
    if (!empty($photo)) {
        $sql .= ", photo='$photo'";
    }
    $sql .= " WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Стикер успешно отредактирован"]);
    } else {
        echo json_encode(["error" => "Ошибка при редактировании стикера: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
