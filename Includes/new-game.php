<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}
include('./_utils.php');
include('../data/JSONable.php');
include('../data/Game.php');

$response = [];

function genererCodeAleatoire()
{
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $chaineAleatoire = '';
    for ($i = 0; $i < 4; $i++) {
        $chaineAleatoire .= $caracteres[rand(0, strlen($caracteres) - 1)];
    }
    $_SESSION['idJoin'] = $chaineAleatoire;
    return $chaineAleatoire;
}


list($game, $jsonError) = Game::getJsonData($_POST["game"]);

$game->setIdHost($_SESSION['idUser']);
$game->setDateTime(date("Y-m-d H:i:s"));
$game->setActive(1);


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
    $score = $db->query("INSERT INTO LA_SCORE (idUser, idGame, score) VALUES (:idUser,:idGame,:score);", array(array(":idUser", $_SESSION['idUser']), array(":idGame", $idGame[0]['id']), array(":score", 0)));
    // session
    $_SESSION['idGame'] = $idGame[0]['id'];
    $response['Insert'] = $game->getIdJoin();
    echo json_encode($response);
}
$idUser = $_SESSION['idUser'];
// ---initialise Game---
//création du fichier de partie
$startingAndEndingWord = explode(" ", exec("bash ../Game/bash/random_words.sh 2"));
$startingWord = $startingAndEndingWord[0];
$endingWord = $startingAndEndingWord[1];
$_SESSION["startingWord"] = $startingWord;
$_SESSION["endingWord"] = $endingWord;
$output = [];
$returnCode = 0;
$_SESSION['score'] = 0;
$_SESSION['coupRestant'] = 10;
$_SESSION['wordList'] = array($startingWord, $endingWord);
$_SESSION['errorCode'] = "";
//$commande = "../Game/C/executables/new_game ../Game/C/datafiles/dic.lex chat chien ../Game/C/datafiles/39.txt ../Game/C/datafiles/words.bin;
$commande = file_build_path("..","Game","C","executables","new_game") . " " . file_build_path("..","Game","C","datafiles","dic.lex") . " " . $startingWord . " " . $endingWord . " " . file_build_path("..","Game","C","datafiles","$idUser.txt") . " " . file_build_path("..","Game","C","datafiles","words.bin");
exec($commande,  $output, $returnCode);
