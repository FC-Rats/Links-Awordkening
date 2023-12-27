<?php
session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}

include 'utils.php';

$log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:datetime,:log,:ip);", array(array(':id', $_SESSION['idUser']), array(':datetime',date('Y-m-d H:i:s')), array(':log', 'Deconnexion'), array(':ip', getIP())));

session_destroy();

header("Location: ../Pages/login.php");
exit;
?>