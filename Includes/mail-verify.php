<?php

include('./mailer.php');

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $idUser = $_SESSION['idUser'];

    $objet = "Vérification de compte";
    $message = " Cher client, 
    <br> Bienvenue,  
    <br> Attention : vous ne pourrez pas changer votre mot de passe tant que votre compte n'est pas vérifié.
    <br> Afin de finaliser votre inscription veuillez cliquer sur le lien de vérification ci-dessous :
    <br><br> Lien d'activation : " . generateVerifyLink($email) . "
    <br><br> De la part de : projet.saebut@gmail.com";

    envoi_mail($email,$objet,$message);
    header("Location: ../Pages/mail-redirection.php");
} else {
    header("Location: ../Pages/index.php");
}

?>
