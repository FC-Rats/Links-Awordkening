<?php
session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}
if (!empty($_POST['username']) && !empty($_POST['birthYear']) && !empty($_POST['email'])) {
    try {
        $updateUser = "UPDATE LA_USER SET username = :username, birthYear = :birthYear, email = :email WHERE username = :username";
        $conditions = array(array(':username', $_POST['username']), array(':birthYear', $_POST['birthYear']), array(':email', $_POST['email']));

        // Exécute la requête SQL avec les paramètres
        $query = $db->query($updateUser, $conditions);

        if ($query) {
            // Si la mise à jour s'est bien déroulée
            $response['modifyUser'] = "success";
            echo json_encode($response);
        } else {
            // Si la mise à jour a échoué
            $response['modifyUser'] = "failed";
            echo json_encode($response);
        }
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

