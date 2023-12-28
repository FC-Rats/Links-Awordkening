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

function envoi_mail($to_email,$conn,$objet,$message)
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

function generateTokenLink($email, $conn)
{
    $token = generateUniqueID(12);
    $link = $config['link_host']."Pages/recuperation-password.php?token=";
    $link .= $token;
    session_start();
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    
    $getId = $db->query("SELECT id FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    $updatePassword = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    return $link;
}

function generateVerifyLink($idUser, $conn)
{
    $token = generateUniqueID(12);
    $link = $config['link_host']."Includes/account-verify.php?token=";
    $link .= $token;
    session_start();
    if (!class_exists('Connection')) {
        include('connection-function.php');
    }
    
    $getId = $db->query("SELECT id FROM LA_USER WHERE email = :email;",array(array(":email", $email)));
    $updatePassword = $db->query("UPDATE LA_USER SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    return $link;
}


