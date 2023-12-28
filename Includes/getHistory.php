<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

$response = [];

$history = $db->query("SELECT s.score, g.name, g.type, g.dateTime FROM LA_SCORE s JOIN LA_GAME g ON s.idGame = g.id WHERE idUser = :idUser", array(array(":idUser", $_SESSION["idUser"])));

$response['History'] = $history;
echo json_encode($response);
?>