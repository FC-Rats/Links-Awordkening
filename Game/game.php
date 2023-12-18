<?php
$randomWords = exec("bash ./random_words.sh 3");
$wordArray = explode(' ', trim($randomWords));
$chartArray = array(array($wordArray[0], $wordArray[1], exec("bash ./random_number.sh")), array($wordArray[1], $wordArray[2], exec("bash ./random_number.sh")), array($wordArray[2], $wordArray[0], exec("bash ./random_number.sh")));

$response["WordsChart"] = $chartArray;
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>
