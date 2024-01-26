<?php
if (!isset($_SESSION)) {
    session_start();
}

$response["WordsChart"] = $_SESSION['WordsChart'];
echo json_encode($response, JSON_UNESCAPED_UNICODE);
