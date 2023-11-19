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
        $mail->setFrom('projetgrenadeunesco@gmail.com', 'FCFLEM');
        $mail->addAddress($to_email, 'Client');
        //$mail->addAddress('lna.chevalier@gmail.com', 'Client');

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
    $link = "http://perso-etudiant.u-pem.fr/~kellian.bredeau/Projet-SAE/Pages/recuperation-password.php?token=";
    $link .= $token;
    session_start();
    if (isset($_SESSION['db'])) {
        $db = $_SESSION['db'];
        $getId = $db->query("SELECT id FROM Users WHERE email = :email;",array(array(":email", $email)));
        $updatePassword = $db->query("UPDATE Users SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    }
    return $link;
}

function generateVerifyLink($idUser, $conn)
{
    $token = generateUniqueID(12);
    $link = "http://perso-etudiant.u-pem.fr/~kellian.bredeau/Projet-SAE/Includes/account-verify.php?token=";
    $link .= $token;
    session_start();
    if (isset($_SESSION['db'])) {
        $db = $_SESSION['db'];
        $getId = $db->query("SELECT id FROM Users WHERE email = :email;",array(array(":email", $email)));
        $updatePassword = $db->query("UPDATE Users SET tokenR = :token WHERE email = :email;", array(array(":token", $token), array(":email", $email)));
    }
    return $link;
}


