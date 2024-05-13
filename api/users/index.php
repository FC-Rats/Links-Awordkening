<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

// Vérification de la méthode de requête
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Exécute la requête SQL pour récupérer les utilisateurs depuis la base de données
    $users = $db->query("SELECT * FROM LA_USER");
    // Envoie la réponse JSON avec les utilisateurs
    echo json_encode($users);
} else {
    // Méthode non autorisée
    http_response_code(405);
    echo json_encode(array("message" => "Méthode non autorisée."));
}
?>
