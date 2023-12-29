<?php
$config = parse_ini_file('config.ini');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include '_utils.php';

function envoi_mail($to_email,$objet,$message, $config)
{
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['mailer_username'];
        $mail->Password = $config['mailer_password'];
        $mail->CharSet  = 'UTF-8';
        $mail->Port = 465;

        //Recipients
        $mail->setFrom('projet.saebut@gmail.com', 'Links Awordkening');
        $mail->addAddress($to_email, 'Client');

        //Content à changer
        $mail->isHTML(true);
        $mail->Subject = $objet;
        $mail->Body = $message;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}

function generateUniqueID($length)
{
    $characters = '0123456789';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, 9)];
    }
    return $randomString;
}

function generateTokenLink($email,$config)
{
    $token = generateUniqueID(12);
    $link = $config['link_host']."Pages/recuperation-password.php?token=";
    $link .= $token;
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    
    $getId = $db->query("SELECT id FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    $recuperation = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $getId[0]["id"]),array(":time", date('Y-m-d H:i:s')), array(":log", "Récupération"), array(":ip", getIP($getId[0]["id"]))));
    return $link;
}

function generateVerifyLink($idUser,$config)
{
    $token = generateUniqueID(12);
    $link = $config['link_host']."Includes/account-verify.php?token=";
    $link .= $token;
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    
    $getId = $db->query("SELECT id FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    $verfication = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $getId[0]["id"]),array(":time", date('Y-m-d H:i:s')), array(":log", "Vérification"), array(":ip", getIP($getId[0]["id"]))));
    return $link;
}