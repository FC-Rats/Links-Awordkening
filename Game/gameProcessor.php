<?php
if (!isset($_SESSION)) {
    session_start();
}
// mettre le fichier dans le dossier input pour Java
$idUser = $_SESSION['idUser'];
$ancienChemin = "C/datafiles/$idUser.txt";
$nouveauChemin = "Java/src/files/input/$idUser.txt";
if (copy($ancienChemin, $nouveauChemin)) {
    echo 'Le fichier a été déplacé avec succès.';
    
    // Supprimer l'ancien fichier
} else {
    echo 'Une erreur s\'est produite lors du déplacement du fichier.';
}

include './javaRunner.php';
$countPreviousWordChart = (isset($_SESSION['WordsChart'])) ? count($_SESSION['WordsChart']) : 0;
$_SESSION['WordsChart'] = [];
$path = "Java/src/files/output/$idUser.txt";
if (file_exists($path) && filesize($path) > 0) {
    $ressource = fopen($path, 'r');
    while (!feof($ressource)) {
        $ligne = fgets($ressource);
        $elements = explode(',', $ligne);
        if (count($elements) > 1) {
            $newEntry = $elements;
            array_push($_SESSION['WordsChart'], [$newEntry[0], $newEntry[1], (int)(floatval($newEntry[2]) * 100)]);
        } else {
            $scoreArray = explode(':', $ligne);
            if (isset($scoreArray[1])) {
                $_SESSION['score'] = $scoreArray[1] * 100;
            }
        }
    }
    fclose($ressource); // Assurez-vous de fermer le fichier après avoir fini de le lire.
}

$_SESSION['relevantWord'] = ($countPreviousWordChart == count($_SESSION['WordsChart'])) ? true : false;
print_r($_SESSION['WordsChart']);
print_r($_SESSION['score']);
header('Location: ../Pages/game-display.php?idJoin='. $_SESSION['idJoin']);
exit();