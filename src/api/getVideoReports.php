<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

$sql = "SELECT r.id, r.video_id, r.reporter_id, r.reason, r.report_date, v.title, v.preview, u.username 
        FROM Reports r
        JOIN Videos v ON r.video_id = v.id
        JOIN Users u ON r.reporter_id = u.id";

$result = $conn->query($sql);

$reports = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reports[] = [
            "id" => $row["id"],
            "video_id" => $row["video_id"],
            "reporter_id" => $row["reporter_id"],
            "reason" => $row["reason"],
            "report_date" => $row["report_date"],
            "title" => $row["title"],
            "preview" => $row["preview"],
            "username" => $row["username"]
        ];
    }
}

echo json_encode($reports);

$conn->close();
?>
