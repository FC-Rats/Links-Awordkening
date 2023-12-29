<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include('../Data/JSONable.php');
include('../Data/Game.php');

$response = [];

list($game, $jsonError) = Game::getJsonData($_POST["game"]);

$game->setIdHost($_SESSION['idUser']);
$game->setDateTime(date("Y-m-d H:i:s"));
$game->setActive(1);

function genererCodeAleatoire()
{
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $chaineAleatoire = '';
    for ($i = 0; $i < 4; $i++) {
        $chaineAleatoire .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    return $chaineAleatoire;
}

$game->setIdJoin(genererCodeAleatoire());
$game->save($db);

//print_r($test);

$response['Insert'] = $game;
echo json_encode($response);
?>