<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');
include('../../Data/JSONable.php');
include('../../Data/Friend.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Traitement pour la méthode GET
        $res = getQuery("SELECT * FROM LA_FRIEND", []);
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
                    array(":idUser", $friend->getId_user()),
                    array(":idFriend", $friend->getId_Friend()),
                    array(":state", $friend->getState())
                );
                // Exécution de la requête SQL
                $req = $db->query(
                    "INSERT INTO LA_FRIEND (idUser, idFriend, state) VALUES (:idUser, :idFriend, :state)", $friendData);
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
            if (isset($data['idUser']) && isset($data['idFriend']) ) { // empêche la modif de toutes les lignes
                // CREATION DU UPDATE
                $res = getQueryUpdate("UPDATE LA_FRIEND", $data);
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
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}

?>
