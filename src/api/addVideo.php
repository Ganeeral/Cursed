<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $title = $_POST['title'];
    $description = $_POST['description'];
    $user_id = $_POST['user_id'];
    $publication_date = date('Y-m-d');
    $imageDir = "../../public/images/";
    $videoDir = "../../public/video/";


    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();



    if (isset($_FILES['preview']) && isset($_FILES['video'])) {
        $author = $user['id'];
        $preview_tmp = $_FILES['preview']['tmp_name'];
        $video_tmp = $_FILES['video']['tmp_name'];

        $preview = '/images/' . basename($_FILES['preview']['name']);
        move_uploaded_file($preview_tmp, $imageDir . basename($_FILES['preview']['name']));

        $video_url = '/video/' . basename($_FILES['video']['name']);
        move_uploaded_file($video_tmp, $videoDir . basename($_FILES['video']['name']));

        if ($conn->connect_error) {
            die('Ошибка подключения к базе данных: ' . $conn->connect_error);
        }
        $sql = "INSERT INTO Videos (title, description, author, publication_date, preview, video_url) VALUES ('$title', '$description', '$author', '$publication_date', '$preview', '$video_url')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Видео успешно добавлено"]);
        } else {
            echo json_encode(["error" => "Ошибка при добавлении видео: " . $conn->error]);
        }

        $conn->close();
    } else {
        echo json_encode(["error" => "Превью и видео не были загружены"]);
    }
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
