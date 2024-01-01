<?php
if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION['WordsChart']) || empty($_SESSION['WordsChart'])) {
    include 'initialise-game.php';
}

if (isset($_POST['mot']) && !empty($_POST['mot'])) {
    $newWord = $_POST['mot'];

    // Créer une nouvelle entrée avec le nouveau mot

    foreach ($_SESSION['WordsChart'] as $entry) {
        if ($entry[0] != $newWord && $entry[1] != $newWord) {
            $newEntry = [$newWord, $entry[0], exec("bash ./random_number.sh")];
            array_push($_SESSION['WordsChart'], $newEntry);
            $_SESSION['score'] += 1; // score a changer
        }

    }


    // Ajouter cette entrée à la structure existante

    header('Location: ../Pages/highcharts.php');
}

$response["WordsChart"] = $_SESSION['WordsChart'];
echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>
