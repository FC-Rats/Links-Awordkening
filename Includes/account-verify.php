<?php

session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}

include '_utils.php';

if (isset($_GET["token"])) {
    $update = $db->query("UPDATE LA_USER SET verified = 1 WHERE tokenR = :token", array(array(":token", $_GET["token"])));
    $getId = $db->query("SELECT id FROM LA_USER WHERE tokenR = :token;", array(array(":token", $_GET["token"])));
    $updateToken = $db->query("UPDATE LA_USER SET tokenR = :token WHERE id = :id;", array(array(":token", NULL), array(":id", $getId[0]["id"])));
    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $getId[0]["id"]),array(":time", date('Y-m-d H:i:s')), array(":log", "Vérification"), array(":ip", getIP($getId[0]["id"]))));
    header("Location: ../Pages/login.php");
    exit();
} else {
    header("Location: ../Pages/index.php");
    exit();
}
