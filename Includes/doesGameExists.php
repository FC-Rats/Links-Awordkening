<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}
include('../Data/JSONable.php');
include('../Data/Game.php');

$response = [];

list($game, $jsonError) = Game::getJsonData($_POST["game"]);

$existingGame = $db->query("SELECT id FROM LA_GAME WHERE name = :name AND idHost = :idHost", array(array(":name", $game->getName()), array(":idHost", $_SESSION['idUser'])));
//VERIFIER LE CHAMPS ACTIVE

if ($existingGame == []) {
    $response['Result'] = false;
    echo json_encode($response);
} else {
    $response['Result'] = true;
    echo json_encode($response);
}