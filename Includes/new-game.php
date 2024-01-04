<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}
include('./_utils.php');
include('../Data/JSONable.php');
include('../Data/Game.php');

$response = [];

list($game, $jsonError) = Game::getJsonData($_POST["game"]);

$game->setIdHost($_SESSION['idUser']);
$game->setDateTime(date("Y-m-d H:i:s"));
$game->setActive(1);

function genererCodeAleatoire()
{
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $chaineAleatoire = '';
    for ($i = 0; $i < 4; $i++) {
        $chaineAleatoire .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    return $chaineAleatoire;
}

$game->setIdJoin(genererCodeAleatoire());
$insert = $game->save($db);

if ($insert === false) {
    $response['Error'] = $game->getErrorData();
    echo json_encode($response);
} else {
    $getId = $db->query("SELECT id FROM LA_USER WHERE username = :username", array(array(':username', $_SESSION['username'])));
    $id_user = $getId[0]['id'];
    $log = $db->query("INSERT INTO LA_LOG (idUser, dateTime, log, ip) VALUES (:id,:datetime,:log,:ip);", array(array(":id", $id_user), array(":datetime", date('Y-m-d H:i:s')), array(":log", "Création d'une partie"), array(":ip", getIP())));
    $idGame = $db->query("SELECT id FROM LA_GAME WHERE name = :name AND idHost = :idHost", array(array(':name', $game->getName()), array(':idHost', $_SESSION['idUser'])));
    // session
    $_SESSION['idGame'] = $idGame[0]['id'];
    $response['Insert'] = $game;
    echo json_encode($response);
}