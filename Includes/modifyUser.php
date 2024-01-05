<?php

session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}
include './mailer.php';
$response = [];
if (!empty($_POST['username']) && !empty($_POST['birthYear']) && !empty($_POST['email'])) {
    try {
        $getpreviousEmail = $db->query("SELECT id, email, username FROM LA_USER WHERE username = :username", array(array(':username', $_SESSION['username'])));
        $alreadyExist = $db->query("SELECT id, email, username FROM LA_USER WHERE email = :email OR username = :username", array(array(':email', $_POST['email']), array(':username', $_POST['username'])));

        if (!empty($alreadyExist) && $alreadyExist[0]['id'] != $getpreviousEmail[0]['id']) {

            envoi_mail($getpreviousEmail[0]['email'], "Modification de votre profil", "La modification de votre profil n'a pas pu aboutir car le mot de passe ou l'email existe déjà.", $config);

            if ($alreadyExist[0]['email'] == $_POST['email'] && $alreadyExist[0]['username'] == $_POST['username']) {
                $response['Error'] = "L'adresse e-mail et le nom d'utilisateur existent déjà.";
                echo json_encode($response);
            } else if ($alreadyExist[0]['email'] == $_POST['email']) {
                $response['Error'] = "L'adresse e-mail existe déjà.";
                echo json_encode($response);
            } else if ($alreadyExist[0]['username'] == $_POST['username']) {
                $response['Error'] = "Le nom d'utilisateur existe déjà.";
                echo json_encode($response);
            }
            $response['Error'] = "L'adresse e-mail ou le nom d'utilisateur existe déjà.";
            echo json_encode($response);
        } else {
            $updateUser = "UPDATE LA_USER SET username = :username, birthYear = :birthYear, email = :email WHERE username = :previousUsername";
            $conditions = array(array(':username', $_POST['username']), array(':birthYear', $_POST['birthYear']), array(':email', $_POST['email']), array(':previousUsername', $getpreviousEmail[0]['username']));

            // Exécute la requête SQL avec les paramètres
            $query = $db->query($updateUser, $conditions);
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['email'] = $_POST['email'];
            envoi_mail($getpreviousEmail[0]['email'], "Modification de votre profil", "Votre profil a bien été modifié.", $config);
            $id_user = $getpreviousEmail[0]['id'];
            $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:datetime,:log,:ip);", array(array(":id", $id_user), array(":datetime", date('Y-m-d H:i:s')), array(":log", "Modification du profil"), array(":ip", getIP())));
            $response['Success'] = "Votre profil a bien été modifié.";
            echo json_encode($response);
        }
    } catch (PDOException $e) {
        // En cas d'erreur de requête SQL
        //TODO erreur sql à gérer avec l'email
        $response['Error'] = "L'adresse e-mail ou le nom d'utilisateur existe déjà. Veuillez changer vos informations."; // Récupère le message d'erreur
        echo json_encode($response);
    }
} else {
    // Si des champs requis sont vides
    $response['Error'] = "Certains champs sont vides.";
    echo json_encode($response);
}


