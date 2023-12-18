<?php

session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}


if (isset($_GET["token"])) {
    $update = $db->query("UPDATE LA_USER SET verified = 1 WHERE token = :token", array(array(":token", $_GET["token"])));
    $getId = $db->query("SELECT id FROM LA_USER WHERE tokenR = :token;", array(array(":token", $token)));
    $updateToken= $db->query("UPDATE LA_USER SET tokenR = ? WHERE id = ?;", array(":token", NULL), array(":id", $userid["id"]));
    header("Location: ../Pages/login.html");
    } else {
        echo 'pas de get';
    }
?>