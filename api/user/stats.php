<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

include_once('../validate.php');
validateJWT($config, $authorizationHeader);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Si des données sont présentes dans la requête
        if (!empty($_GET['idUser'])) {
            $scores = $db->query("SELECT la_game.id, dateTime, type, name, idUser, idGame, score, words, idHost FROM `la_score` JOIN la_game ON la_score.idGame = la_game.id WHERE idGame IN (SELECT idGame FROM la_score WHERE idUser = :idUser);", [[":idUser", $_GET['idUser']]]);
            echo json_encode($scores);
        } else {
            echo json_encode(["error" => "Données non compatibles"]);
        }
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}