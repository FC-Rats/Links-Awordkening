<?php
include_once('../cors.php');
include_once('../../configuration.php');

session_start();

if (!class_exists('Connection')) {
    include('../connection-function.php');
}

require_once('../_utils.php');
include('../../data/JSONable.php');
include('../../data/Log.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/

include_once('../validate.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        validateJWT($config, $authorizationHeader);
        // Traitement pour la méthode GET
        $res = getQuery("SELECT * FROM la_log", []);
        $sql = $res[0];
        $conditions = $res[1];
        $logs = $db->query($sql, $conditions);
        echo json_encode($logs);
        break;
    case 'POST':
        // Traitement pour la méthode POST
        // ON récupère les informations à remplir
        $jsonData = file_get_contents('php://input');
        // Si y a -> sinon erreur
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
        
            // Conversion des données JSON en objet PHP
            list($log, $jsonError) = Log::getJsonData($data); 
        
            // Création du tableau des valeurs des paramètres pour la requête SQL
            $logdata = array(
                array(":id", $log->getIdUser()),
                array(":time", date('Y-m-d H:i:s')), // HEURE ACTUELLE
                array(":log", $log->getLog()),
                array(":ip", getIP($log->getIdUser())) // IP DE LA PERSONNE
            );
            // Exécution de la requête SQL
            $req = $db->query(
                "INSERT INTO la_log (idUser, dateTime, log, ip) VALUES (:id, :time, :log, :ip)", $logdata);
            $res = [];
            $res['Log'] = $logdata;
            echo json_encode($res);
        } else {
            // Aucune donnée n'a été envoyée dans le corps de la requête
            echo json_encode(["error" => "Aucune donnée n'a été envoyée dans le corps de la requête."]);
        }
        break;
    case 'PUT':
        validateJWT($config, $authorizationHeader);
        // Traitement pour la méthode PUT
        $jsonData = file_get_contents('php://input');
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
            if (isset($data['idUser']) && isset($data['dateTime']) && isset($data['log']) ) { // empêche la modif de toutes les lignes
                // CREATION DU UPDATE
                $res = updateQuery("UPDATE la_log", $data);
                $sql = $res[0];
                $conditions = $res[1];
                // WHERE SCORE = IDUSER et IDGAME
                $sql .= " WHERE ";
                $sql .= "idUser = :idUser AND dateTime = :dateTime AND log = :log";
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
