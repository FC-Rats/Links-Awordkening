<?php

session_start();

include('./mailer.php');

if (isset($_POST['email'])) {
    $email = $_POST['email'];

    $objet = "Récuperation mot de passe";
    $message = " Cher client, 
    <br> Il semble que vous avez oublié votre mot de passe.  
    <br> Si ce n'est pas vous à l'origine de cette récupération de compte, ignorez ce mail. \n
    <br><br> Lien d'activation : " . generateTokenLink($email,$conn) . "
    <br><br> De la part de : projetgrenadeunesco@gmail.com";

    envoi_mail($email,$conn,$objet,$message);
    header("Location: ../Pages/login.html");
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
