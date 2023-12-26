<?php 
session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}

$response = [];

$logs = $db->query("SELECT * FROM LA_LOG LIMIT 500");

$response['Logs'] = $logs;
echo json_encode($response);