<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include '../Includes/_utils.php';
redirectionNotAdmin();

$response = [];

if (isset($_POST['idUser'])) {
    $id = $_POST['idUser'];
    $db->query("UPDATE LA_USER SET isAdmin = 1 WHERE idUser = :idUser", [[':idUser', $id]]);
    $response['Success'] = true;
} else {
    header('Location: ../Pages/adminListUsers.php');
}

echo json_encode($response);