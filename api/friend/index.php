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
include('../../data/Friend.php');

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
        // Traitement pour la méthode GET
        $res = getQuery("SELECT * FROM la_friend", []);
        $sql = $res[0];
        $conditions = $res[1];
        $friends = $db->query($sql, $conditions);
        echo json_encode($friends);
        break;
    case 'POST':
        // Traitement pour la méthode POST
        // ON récupère les informations à remplir
        $jsonData = file_get_contents('php://input');
        // Si y a -> sinon erreur
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);

            // Conversion des données JSON en objet PHP
            list($friend, $jsonError) = Friend::getJsonData($data);

            // Création du tableau des valeurs des paramètres pour la requête SQL
            $friendData = array(
                array(":idUser", $friend->getIdUser()),
                array(":idFriend", $friend->getIdFriend()),
                array(":state", $friend->getState())
            );
            // Exécution de la requête SQL
            $req = $db->query(
                "INSERT INTO la_friend (idUser, idFriend, state) VALUES (:idUser, :idFriend, :state)",
                $friendData
            );
            $res = [];
            $res['Friend'] = $friendData;
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
            if (isset($data['idUser']) && isset($data['idFriend'])) { // empêche la modif de toutes les lignes
                // CREATION DU UPDATE
                $res = updateQuery("UPDATE la_friend", $data);
                $sql = $res[0];
                $conditions = $res[1];
                // WHERE SCORE = IDUSER et IDGAME
                $sql .= " WHERE ";
                $sql .= "idUser = :idUser AND idFriend = :idFriend";
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
    case 'DELETE':
        // Traitement pour la méthode DELETE
        if (isset($_GET['idFriend']) && isset($_GET['idUser'])) {
            $delete = $db->query(
                "DELETE FROM la_friend WHERE idFriend = :idFriend AND idUser = :idUser",
                [[":idFriend", $_GET['idFriend']],[":idUser", $_GET['idUser']]]
            );
            echo json_encode($delete);
        } else {
            echo json_encode(["error" => "Id manquant dans la requête DELETE"]);
        }
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}
