<?php
session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}
include 'utils.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Vérifier les informations de connexion dans la base de données
        $connectionVerif = $db->query("SELECT id, username, password, verified FROM LA_USER WHERE username = :username", array(array(":username", $username)));
        if (count($connectionVerif) == 1) {
            if (password_verify($password, $connectionVerif[0]['password']) && $connectionVerif[0]['verified'] == 1) {
                $_SESSION["username"] = $connectionVerif[0]['username'];
                $_SESSION["idUser"] = $connectionVerif[0]['id'];

                $id_user = $_SESSION["idUser"];
                
                $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:time,:log,:ip);", array(array(":id", $id_user), array(":time", date('Y-m-d H:i:s')), array(":log", "Connexion"), array(":ip", getIP())));
                header("Location: ../Pages/index.php");
            } else {
                echo "Mot de passe incorrect.";
            }
        } else {
            echo "Nom d'utilisateur incorrect.";
        }
    }
}
