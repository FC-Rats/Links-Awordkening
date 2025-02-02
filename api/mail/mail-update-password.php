<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

/* 
$token = $_POST['token'];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$getId = $db->query("SELECT id, email FROM LA_USER WHERE tokenR = :token", array(array(":token", $token)));
$updatePassword = $db->query("UPDATE LA_USER SET password = :password , tokenR = :token WHERE id = :id;", array(array(":password", $password), array(":token", NULL), array(":id", $getId[0]["id"])));
$log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $getId[0]["id"]),array(":time", date('Y-m-d H:i:s')), array(":log", "Modification"), array(":ip", getIP($getId[0]["id"]))));
 */

function handlePasswordUpdate($email) {

    $objet = "Modification mot de passe";
    $message = " Cher client,
    <br> Votre mot de passe a bien été modifié.
    <br><br> De la part de :
    <br> L'équipe Links Awordkening";
    
    envoi_mail($email, $objet, $message);
    exit();
}