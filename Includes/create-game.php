<?php
session_start();

if (!class_exists('Connection')) {
    include('connection-function.php');
}


function genererCodeAleatoire()
{
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $chaineAleatoire = '';
    for ($i = 0; $i < 4; $i++) {
        $chaineAleatoire .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    return $chaineAleatoire;
}

$code = genererCodeAleatoire();
$verificationCode = $db->query("SELECT id FROM LA_GAME WHERE idJoin = :idJoin AND active = :active", array(array(":idJoin", $code), array(":active", 1)));
if (empty($verificationCode)) {
    $createGame = $db->query("INSERT INTO LA_GAME (idJoin, idHost, dateTime, name, type, maxPlayer, active) VALUES (:idJoin,:idHost,:date,:name,:type, :maxPlayer, :active)", array(array(":idJoin", $code), array(":idHost", $_SESSION["idUser"]), array(":date", date('Y-m-d H:i:s')), array(":name", $_POST["name"]), array(":type", $_POST["type"]), array(":maxPlayer", $_POST["maxPlayer"]), array(":active", 1)));

    $resultat = exec("../Game/random.sh");
    $score = (int)$resultat;
    echo "Le score est : $score";

    $lastId = $db->query("SELECT LAST_INSERT_ID();");
    $addScore = $db->query("INSERT INTO Stats (idUser, idGame, score) VALUES (:idUser, :idGame, :score)", array(array(":idUser", $_POST["idUser"]), array(":idGame", $lastId), array(":score", $score)));
}
