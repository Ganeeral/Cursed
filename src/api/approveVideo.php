<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $video_id = $data['video_id'];
    $category_id = $data['category_id'];

    if (!$category_id) {
        echo json_encode(["error" => "Категория не выбрана"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM PendingVideos WHERE id = ?");
    $stmt->bind_param("i", $video_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $video = $result->fetch_assoc();

    if ($video) {
        $title = $video['title'];
        $description = $video['description'];
        $author = $video['author'];
        $publication_date = $video['publication_date'];
        $preview = $video['preview'];
        $video_url = $video['video_url'];

        $sql = "INSERT INTO Videos (title, description, author, publication_date, preview, video_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssisssi", $title, $description, $author, $publication_date, $preview, $video_url, $category_id);

        if ($stmt->execute()) {
            $delete_sql = "DELETE FROM PendingVideos WHERE id = ?";
            $stmt = $conn->prepare($delete_sql);
            $stmt->bind_param("i", $video_id);
            $stmt->execute();
            echo json_encode(["message" => "Видео успешно опубликовано"]);
        } else {
            echo json_encode(["error" => "Ошибка при публикации видео: " . $stmt->error]);
        }
    } else {
        echo json_encode(["error" => "Видео не найдено"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
