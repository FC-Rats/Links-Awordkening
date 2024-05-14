<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');
include('../../Data/JSONable.php');
include('../../Data/Score.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $res = getQuery("SELECT * FROM LA_SCORE", []);
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
                array(":score", 0),
            );

            // Exécution de la requête SQL
            $req = $db->query(
                "INSERT INTO LA_SCORE (idUser, idGame, score) 
                VALUES (:idUser, :idGame, :score)", 
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
        break;
    case 'DELETE':
        // Traitement pour la méthode DELETE
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

?>
