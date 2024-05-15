<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST' :
        $jsonData = file_get_contents('php://input');
        // Si des données sont présentes dans la requête
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
            $res = passwordVerifyFunction($db, $data['username'], $data['password']);
            echo json_encode(["response" => $res]);
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
