<?php
if (!isset($_SESSION)) {
    session_start();
}
if (isset($_POST['retour'])) {
    $idUser = $_SESSION['idUser'];
    //supprimer les fichiers de partie de l'utilisateur
    $fichierC = "./C/datafiles/$idUser.txt";
    $fichierJavaInput = "./Java/src/files/input/$idUser.txt";
    $fichierJavaOutput = "./Java/src/files/output/$idUser.txt";

    if (unlink($fichierC) && unlink($fichierJavaInput) && unlink($fichierJavaOutput)) {
        echo 'Les fichiers a été supprimés avec succès.';
    } else {
        echo 'Une erreur s\'est produite lors de la suppression des fichiers.';
    }
    // supprimer les données de la session de la partie
    unset($_SESSION['score']);
    unset($_SESSION['WordsChart']);
    unset($_SESSION['wordList']);
    unset($_SESSION['errorCode']);
    // supprimer l'objet Game ?

    header('Location: ../Pages/index.php'); // Rediriger l'utilisateur vers index.php
    exit();
}

