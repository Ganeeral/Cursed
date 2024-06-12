<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['id']) || !isset($_POST['username'])) {
        echo json_encode(["error" => "Неправильный ввод"]);
        exit();
    }

    $id = $_POST['id'];
    $newUsername = $_POST['username'];

    $avatarDir = "../../public/images/";
    $previewDir = "../../public/images/";
    $authorAvatar = "";
    $preview = "";

    if (isset($_FILES['author_avatar']) && $_FILES['author_avatar']['error'] === UPLOAD_ERR_OK) {
        $avatarTmp = $_FILES['author_avatar']['tmp_name'];
        $authorAvatar = '/images/' . basename($_FILES['author_avatar']['name']);
        move_uploaded_file($avatarTmp, $avatarDir . basename($_FILES['author_avatar']['name']));
    }

    if (isset($_FILES['preview']) && $_FILES['preview']['error'] === UPLOAD_ERR_OK) {
        $previewTmp = $_FILES['preview']['tmp_name'];
        $preview = '/images/' . basename($_FILES['preview']['name']);
        move_uploaded_file($previewTmp, $previewDir . basename($_FILES['preview']['name']));
    }

    if ($conn->connect_error) {
        die(json_encode(["error" => "Ошибка подключения к базе данных: " . $conn->connect_error]));
    }

    $conn->begin_transaction();

    try {
        $stmtSelect = $conn->prepare("SELECT username FROM Users WHERE id = ?");
        $stmtSelect->bind_param("i", $id);
        $stmtSelect->execute();
        $result = $stmtSelect->get_result();
        $row = $result->fetch_assoc();
        $oldUsername = $row['username'];
        $stmtSelect->close();

        $stmtUpdateVideos = $conn->prepare("UPDATE videos SET author = ? WHERE author = ?");
        $stmtUpdateVideos->bind_param("ss", $newUsername, $oldUsername);
        $stmtUpdateVideos->execute();
        $stmtUpdateVideos->close();

        $sqlUsers = "UPDATE Users SET username=?";
        $params = [$newUsername];
        $types = "s";

        if (!empty($authorAvatar)) {
            $sqlUsers .= ", author_avatar=?";
            $params[] = $authorAvatar;
            $types .= "s";
        }

        if (!empty($preview)) {
            $sqlUsers .= ", preview=?";
            $params[] = $preview;
            $types .= "s";
        }

        $sqlUsers .= " WHERE id=?";
        $params[] = $id;
        $types .= "i";

        $stmtUsers = $conn->prepare($sqlUsers);
        $stmtUsers->bind_param($types, ...$params);
        $stmtUsers->execute();
        $stmtUsers->close();

        $conn->commit();

        echo json_encode(["message" => "Профиль успешно отредактирован"]);

    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["error" => "Ошибка при редактировании профиля: " . $e->getMessage()]);
    } finally {
        $conn->close();
    }

} else {
    echo json_encode(["error" => "Метод не разрешен"]);
}
?>
