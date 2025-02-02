<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

include_once('../cors.php');
include_once('../authenticate.php');
include_once('../../configuration.php');

session_start();

if (!class_exists('Connection')) {
    include('../connection-function.php');
}

require_once('../_utils.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST' :
        $jsonData = file_get_contents('php://input');
        // Si des données sont présentes dans la requête
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
            $res = passwordVerifyFunction($db, $data['username'], $data['password']);
            if ($res) {
                echo json_encode(["token" => hasValidCredentials($data['username'], $config)]);
            } else {
                echo json_encode(["error" => "Mot de passe incorrect"]);
            }
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
