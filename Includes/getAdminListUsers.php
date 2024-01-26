<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include '../Includes/_utils.php';
redirectionConnection();

$response = [];
$users = $db->query("SELECT id, username, birthYear, email, verified, admin FROM LA_USER");

$response['Users'] = $users;
echo json_encode($response);
?>