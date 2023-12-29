<?php
session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}
include './mailer.php';
if (!empty($_POST['username']) && !empty($_POST['birthYear']) && !empty($_POST['email'])) {
    try {
        
        $getpreviousEmail = $db->query("SELECT email, username FROM LA_USER WHERE username = :username", array(array(':username', $_SESSION['username'])));
        $updateUser = "UPDATE LA_USER SET username = :username, birthYear = :birthYear, email = :email WHERE username = :previousUsername";
        $conditions = array(array(':username', $_POST['username']), array(':birthYear', $_POST['birthYear']), array(':email', $_POST['email']), array(':previousUsername', $getpreviousEmail[0]['username']));

        // Exécute la requête SQL avec les paramètres
        $query = $db->query($updateUser, $conditions);
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['email'] = $_POST['email'];
        envoi_mail($getpreviousEmail[0]['email'], "Modification de votre profil", "Votre profil a bien été modifié.", $config);
        echo json_encode($response);
    } catch (PDOException $e) {
        // En cas d'erreur de requête SQL
        $response['error'] = $e->getMessage(); // Récupère le message d'erreur
        echo json_encode($response);
    }
} else {
    // Si des champs requis sont vides
    $response['error'] = "Certains champs sont vides.";
    echo json_encode($response);
}

