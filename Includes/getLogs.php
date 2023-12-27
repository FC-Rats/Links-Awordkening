<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

$response = [];

$logs = $db->query("SELECT u.username, l.idUser, l.ip, l.log, l.dateTime FROM LA_LOG l JOIN LA_USER u ON u.id = l.idUser LIMIT 500");

$response['Logs'] = $logs;
echo json_encode($response);
?>