<?php
if (!isset($_SESSION)) {
    session_start();
}
$randomWords = exec("bash ./random_words.sh 2");
$wordArray = explode(' ', trim($randomWords));
$chartArray = array(
    array($wordArray[0], $wordArray[1], exec("bash ./random_number.sh")),
    array($wordArray[1], $wordArray[0], exec("bash ./random_number.sh"))
);
$_SESSION['WordsChart'] = $chartArray;
$_SESSION['score'] = 0;