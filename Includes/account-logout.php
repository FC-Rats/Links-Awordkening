<?php
session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}

$log = $db->query("INSERT INTO LA_LOG (idUser, datetime, log) VALUES (:id,:datetime,:log);", array(array(':id', $_SESSION['idUser']), array(':datetime',date('Y-m-d H:i:s')), array(':log', 'Deconnexion')));

session_destroy();

header("Location: ../Pages/login.html");
exit;
?>