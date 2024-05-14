<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

require_once('../_utils.php');
include('../../Data/JSONable.php');
include('../../Data/User.php');

// Vérification de la méthode de requête
/*
GET: SELECT - Dans l'url
POST: INSERT - Dans body
PUT: UPDATE - Dans body
DELETE: DELETE - Dans l'url
*/

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $res = getQuery("SELECT * FROM LA_USER", []);
        $sql = $res[0];
        $conditions = $res[1];
        $users = $db->query($sql, $conditions);
        echo json_encode($users);
        break;
    case 'POST':
        // Traitement pour la méthode POST
        // ON récupère les informations à remplir
        $jsonData = file_get_contents('php://input');

        // Si des données sont présentes dans la requête
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);

            // Conversion des données JSON en objet PHP
            list($user, $jsonError) = User::getJsonData($data); 

            // Création du tableau des valeurs des paramètres pour la requête SQL
            $userData = array(
                array(":username", $user->getUsername()),
                array(":birthYear", $user->getBirthYear()),
                array(":email", $user->getEmail()),
                array(":password", password_hash($user->getPassword(), PASSWORD_DEFAULT)),
            );

            // Exécution de la requête SQL
            $req = $db->query(
                "INSERT INTO LA_USER (username, birthYear, email, password) 
                VALUES (:username, :birthYear, :email, :password)", 
                $userData
            );
            $res = [];
            $res['User'] = $userData;
            $res['lastId'] = $db->query("SELECT LAST_INSERT_ID();");
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
