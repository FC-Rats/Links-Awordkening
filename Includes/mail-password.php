<?php

session_start();

include('./mailer.php');

if (isset($_POST['email'])) {
    $email = $_POST['email'];

    $objet = "Récuperation mot de passe";
    $res= generateTokenLink($email);
    if ($res != "") {
        $message = " Cher client, 
        <br> Il semble que vous avez oublié votre mot de passe.  
        <br> Si ce n'est pas vous à l'origine de cette récupération de compte, ignorez ce mail. \n
        <br><br> Lien d'activation : " . $res . "
        <br><br> De la part de : projet.saebut@gmail.com";
    } else {
        $message = " Cher client, 
        <br> Il semble que vous avez oublié votre mot de passe.  
        <br> Si ce n'est pas vous à l'origine de cette récupération de compte, ignorez ce mail. \n
        <br><br> Votre compte n'est pas vérifié, veuillez vérifier votre compte avant de pouvoir changer votre mot de passe.
        <br><br> De la part de : projet.saebut@gmail.com";
    }

    envoi_mail($email, $objet, $message);
    header("Location: ../Pages/mail-redirection-recover.php");
} else {
    header("Location: ../Pages/recover.php");
}