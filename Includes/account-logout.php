<?php
session_start();
if (isset($_SESSION['db'])) {
    $db = $_SESSION['db'];
    print_r($_SESSION); 
    $log = $db->query("INSERT INTO Logs (idUser, time, log) VALUES (:id,:time,:log);", array(array(":id"; $_SESSION["idUser"]), array(":time",date('Y-m-d H:i:s')), array(":log", "Déconnexion")));
}
session_destroy();

header("Location: ../Pages/login.html");
exit;
?>