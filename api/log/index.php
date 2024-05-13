<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $res = getQuery("SELECT * FROM LA_LOG", []);
        $sql = $res[0];
        $conditions = $res[1];
        $logs = $db->query($sql, $conditions);
        echo json_encode($logs);
        break;
    case 'POST':
        // Traitement pour la méthode POST
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
