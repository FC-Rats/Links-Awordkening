<?php

session_start();

include('./mailer.php');

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $idUser = $_SESSION['idUser'];

    $objet = "Vérification de compte";
    $message = " Cher client, 
    <br> Bienvenue,  
    <br> Attention : vous ne pourrez pas changer votre mot de passe tant que votre compte n'est pas vérifié.
    <br> afin de finaliser votre inscription veuillez cliquer sur le lien de vérification ci-dessous :
    <br><br> Lien d'activation : " . generateVerifyLink($email,$conn) . "
    <br><br> De la part de : projetgrenadeunesco@gmail.com";

    envoi_mail($email,$conn,$objet,$message);
    header("Location: mail-redirection.php");
    /*     $stmt = $conn->prepare("SELECT email FROM WUsers WHERE email = ?;");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $ligne = $result->fetch_assoc();

    if ($ligne) {
        // Alors l'adresse existe => on envoit le mail
        if (envoi_mail($email)) {
            echo 'OK';
        } else {
            echo "Une erreur s'est produite";
        }
    } else {
        echo "Adresse e-mail non trouvée dans la base de données.";
    }
} else {
    echo "L'adresse e-mail n'a pas été fournie.";*/
} 

?>
