<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

function handlePasswordVerify($email) {

    $objet = "Vérification de compte";
    $message = " Cher client, 
    <br> Bienvenue,  
    <br> Attention : vous ne pourrez pas changer votre mot de passe tant que votre compte n'est pas vérifié.
    <br> Afin de finaliser votre inscription veuillez cliquer sur le lien de vérification ci-dessous :
    <br><br> Lien d'activation : " . generateVerifyLink($email) . "
    <br><br> De la part de : projet.saebut@gmail.com";

    envoi_mail($email,$objet,$message);
    exit();
} 

