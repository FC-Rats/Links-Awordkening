<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

include_once('../cors.php');
include_once('../../configuration.php');

session_start();

if (!class_exists('Connection')) {
    include('../connection-function.php');
}

require_once('../_utils.php');
include('../../data/JSONable.php');
include('../../data/Score.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/
include_once('../validate.php');
validateJWT($config, $authorizationHeader);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $res = getQuery("SELECT * FROM la_score", []);
        $sql = $res[0];
        $conditions = $res[1];
        $scores = $db->query($sql, $conditions);
        echo json_encode($scores);
        break;
    case 'POST':
        // Traitement pour la méthode POST
        // ON récupère les informations à remplir
        $jsonData = file_get_contents('php://input');

        // Si des données sont présentes dans la requête
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);

            // Conversion des données JSON en objet PHP
            list($score, $jsonError) = Score::getJsonData($data); 

            // Création du tableau des valeurs des paramètres pour la requête SQL
            $scoreData = array(
                array(":idUser", $score->getIdUser()),
                array(":idGame", $score->getIdGame()),
                array(":score", $score->getScore()),
                array(":words", $score->getWords())
            );

            // Exécution de la requête SQL
            $req = $db->query(
                "INSERT INTO la_score (idUser, idGame, score, words) 
                VALUES (:idUser, :idGame, :score, :words)", 
                $scoreData
            );
            $res = [];
            $res['Score'] = $scoreData;
            echo json_encode($res);
        } else {
            // Aucune donnée n'a été envoyée dans le corps de la requête
            echo json_encode(["error" => "Aucune donnée n'a été envoyée dans le corps de la requête."]);
        }
        break;
    case 'PUT':
        // Traitement pour la méthode PUT
        $jsonData = file_get_contents('php://input');
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
            if (isset($data['idGame']) && isset($data['idUser']) ) { // empêche la modif de toutes les lignes
                // CREATION DU UPDATE
                $res = updateQuery("UPDATE la_score", $data);
                $sql = $res[0];
                $conditions = $res[1];
                // WHERE SCORE = IDUSER et IDGAME
                $sql .= " WHERE ";
                $sql .= "idUser = :idUser AND idGame = :idGame";
                $scoredb = $db->query($sql, $conditions);
                echo json_encode($scoredb);
            } else {
                echo json_encode(["error" => "Mauvais format de données"]);
            }
        } else {
            // Aucune donnée n'a été envoyée dans le corps de la requête
            echo json_encode(["error" => "Aucune donnée n'a été envoyée dans le corps de la requête."]);
        }
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

?>
