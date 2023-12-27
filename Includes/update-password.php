<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!class_exists('Connection')) {
    include('connection-function.php');
}

include 'utils.php';

$token = $_POST['token'];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$getId = $db->query("SELECT id FROM LA_USER WHERE tokenR = :token;", array(array(":token", $token)));
$updatePassword = $db->query("UPDATE LA_USER SET password = ? , tokenR = ? WHERE id = ?;", array(array(":password", $password), array(":token", NULL), array(":id", $userid["id"])));
$log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $id_user),array(":time", date('Y-m-d H:i:s')), array(":log", "Récupération"), array(":ip", getIP())));
header("Location: ../Pages/login.php");

?>