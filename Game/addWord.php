<?php
if (!isset($_SESSION)) {
    session_start();
}

if (isset($_POST['mot']) && empty($_POST['mot'])) {
    header('Location: ../Pages/game-display.php');
}

if (isset($_POST['mot']) && !empty($_POST['mot'])) {
    $newWord = strtolower($_POST['mot']);
    // Vérifier si le mot est déjà utilisé
    if (in_array($newWord, $_SESSION['wordList'])) {
        $_SESSION['errorCode'] = "Mot déjà utilisé";
        header("Location: ../Pages/game-display.php");
        exit();
    } elseif (preg_match('/\d/', $newWord)) {
        // Vérifier si le mot contient des chiffres
        $_SESSION['errorCode'] = "Le mot ne doit pas contenir de chiffres";
        header("Location: ../Pages/game-display.php");
        exit();
    } elseif (preg_match('/[^\p{L}\p{N}]/u', $newWord)) {
        // Vérifier si le mot contient des caractères spéciaux
        $_SESSION['errorCode'] = "Le mot ne doit pas contenir de caractères spéciaux";
        header("Location: ../Pages/game-display.php");
        exit();
    } else {
        $_SESSION['errorCode'] = "";
        // Continuer le traitement si nécessaire
    }
    array_push($_SESSION['wordList'] , $newWord);
    $_SESSION['coupRestant']--;
    $idUser = $_SESSION['idUser'];
    // Créer une nouvelle entrée avec le nouveau mot
    $output = [];
    $returnCode = 0;
    exec(".\\C\\exec_WINDOWS\\add_word .\\C\\datafiles\\dic.lex $newWord .\\C\\datafiles\\$idUser.txt .\\C\\datafiles\\words.bin", $output, $returnCode); // marche pas

    echo "Output: " . implode("\n", $output) . "\n";
    echo "Return Code: $returnCode\n";
    header('Location: gameProcessor.php');
    exit();
}