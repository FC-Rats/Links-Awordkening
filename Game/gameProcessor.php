<?php
if (!isset($_SESSION)) {
    session_start();
}
function areListsEqual($list1, $list2) {
    if (count($list1) !== count($list2)) {
        return false;
    }

    foreach ($list1 as $key => $value) {
        if (is_array($value) && is_array($list2[$key])) {
            // Appel récursif si les éléments sont des listes
            if (!areListsEqual($value, $list2[$key])) {
                return false;
            }
        } elseif ($value !== $list2[$key]) {
            return false;
        }
    }

    return true;
}

// mettre le fichier dans le dossier input pour Java
$idUser = $_SESSION['idUser'];
$ancienChemin = "C/datafiles/$idUser.txt";
$nouveauChemin = "Java/src/files/input/$idUser.txt";

copy($ancienChemin, $nouveauChemin);

include './javaRunner.php';
$PreviousWordChart = isset($_SESSION['WordsChart']) ? $_SESSION['WordsChart'] : [];
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

$_SESSION['relevantWord'] = areListsEqual($PreviousWordChart, $_SESSION['WordsChart']);
header('Location: ../Pages/game-display.php?idJoin='. $_SESSION['idJoin']);
exit();