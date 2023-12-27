<?php
session_start();
if (!class_exists('Connection')) {
    include('connection-function.php');
}

include 'utils.php';

if (isset($_POST["username"]) && isset($_POST["birthYear"]) && isset($_POST["email"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $birthYear = $_POST["birthYear"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Vérifier si le mail ou le nom d'utilisateur existe déjà
    $mailVerif = $db->query("SELECT id, username FROM LA_USER WHERE email = :email OR username = :username", array(array(":email", $email), array(":username", $username)));
    print_r($mailVerif);

    if (empty($mailVerif)) {
            // L'adresse e-mail et le nom d'utilisateur sont uniques, effectuez l'insertion
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $createAccount = $db->query("INSERT INTO LA_USER (username, birthYear, email, password) VALUES (:username,:birthYear,:email,:password)", array(array(":username", $username), array(":birthYear", $birthYear),array(":email", $email),array(":password", $hashed_password)));
            if (empty($createAccount)) {
                $_SESSION["username"] = $username;
                $lastId = $db->query("SELECT LAST_INSERT_ID();");

                if ($lastId[0]) {
                    print_r($lastId[0]["LAST_INSERT_ID()"]);
                    $id_user = $lastId[0]["LAST_INSERT_ID()"];
                    $_SESSION["idUser"] = $id_user;
                    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:datetime,:log,:ip);", array(array(":id", $id_user),array(":datetime", date('Y-m-d H:i:s')), array(":log", "Inscription"), array(":ip", getIP())));
                    //$_SESSION['db'] = $db;
                    include ('mail-verify.php');
                } else {
                    throw new Exception("L'adresse e-mail ou le nom d'utilisateur existe déjà. Veuillez vous connecter.");
                }
            } else {
                throw new Exception("L'adresse e-mail ou le nom d'utilisateur existe déjà. Veuillez vous connecter.");
            }
        } else {
            throw new Exception("L'adresse e-mail ou le nom d'utilisateur existe déjà. Veuillez vous connecter.");
        }


} else {
    header("Location: ../Pages/index.php");
}
?>