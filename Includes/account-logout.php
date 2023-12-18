<?php
session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}
    $log = $db->query("INSERT INTO Logs (idUser, time, log) VALUES (:id,:time,:log);", array(array(":id"; $_SESSION["idUser"]), array(":time",date('Y-m-d H:i:s')), array(":log", "Déconnexion")));
session_destroy();

header("Location: ../Pages/login.html");
exit;
?>