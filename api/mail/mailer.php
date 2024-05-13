<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require '../../Includes/PHPMailer/src/Exception.php';
require '../../Includes/src/PHPMailer.php';
require '../../Includes/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

include_once '_utils.php';

function envoi_mail($to_email,$objet,$message)
{
    $mail = new PHPMailer(true);

    try {
        include('../configuration.php');
        //Server settings
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['PHPMailer']['mailadress'];;
        $mail->Password = $config['PHPMailer']['mailpassword'];
        $mail->CharSet  = 'UTF-8';
        $mail->Port = 465;

        //Recipients
        $mail->setFrom($config['PHPMailer']['mailadress'], 'Links Awordkening');
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

function generateTokenLink($email)
{
    include('../configuration.php');

    $token = generateUniqueID(12);
    $link = $config['links']['host']."Pages/recuperation-password.php?token=";
    $link .= $token;
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    
    $getId = $db->query("SELECT id, verified FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    if ($getId[0]["verified"] == 0) {
        return "";
    }
    $recuperation = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $getId[0]["id"]),array(":time", date('Y-m-d H:i:s')), array(":log", "Récupération"), array(":ip", getIP($getId[0]["id"]))));
    return $link;
}

function generateVerifyLink($email)
{
    include('../configuration.php');

    $token = generateUniqueID(12);
    $link = $config['links']['host']."Includes/account-verify.php?token=";
    $link .= $token;
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    global $db;
    
    $getId = $db->query("SELECT id FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    $verfication = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    return $link;
}