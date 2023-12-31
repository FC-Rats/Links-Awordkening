<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include('../Data/JSONable.php');
include('../Data/User.php');
include('../Data/Score.php');

$response = [];

list($test, $jsonError) = User::getJsonData($_POST["test"]);

$score1 = new Score();
$score1->setIdUser(1);
$test->setScores([$score1, new Score()]);

//print_r($test);

$response['Test'] = $test;
echo json_encode($response);
