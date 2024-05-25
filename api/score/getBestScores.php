<?php
include_once('../cors.php');
include_once('../authenticate.php');
include_once('../../configuration.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST' :
        $query = "
        SELECT 
            u.id,
            u.username,
            SUM(s.score) AS totalScore
        FROM 
            la_user u
        JOIN 
            la_score s ON u.id = s.idUser
        GROUP BY 
            u.id, u.username
        ORDER BY 
            totalScore DESC
        LIMIT 3;
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
