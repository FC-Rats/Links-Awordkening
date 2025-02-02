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
        $query = "
        SELECT 
            u.id,
            u.username,
            u.visibility,
            MAX(s.score) AS totalScore
        FROM 
            la_user u
        JOIN 
            la_score s ON u.id = s.idUser
        GROUP BY 
            u.id, u.username
        ORDER BY 
            totalScore DESC;
        ";
        $req = $db->query($query);
        echo json_encode($req);
        break;
    default:
        // Méthode non autorisée
        http_response_code(405);
        echo json_encode(array("message" => "Méthode non autorisée."));
        break;
}
