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
include('../../data/User.php');

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
        $res = getQuery("SELECT * FROM la_user", []);
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
                "INSERT INTO la_user (username, birthYear, email, password) 
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
        $jsonData = file_get_contents('php://input');
        if (!empty($jsonData)) {
            $data = json_decode($jsonData, true);
            if (isset($data['id'])) { // empêche la modif de toutes les lignes
                if (isset($data['password'])) {
                    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                }
                // CREATION DU UPDATE
                $res = updateQuery("UPDATE la_user", $data);
                $sql = $res[0];
                $conditions = $res[1];
                // WHERE SCORE = IDUSER et IDGAME
                $sql .= " WHERE ";
                $sql .= "id = :id";
                $userdb = $db->query($sql, $conditions);
                echo json_encode($userdb);
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
