<?php
if (!isset($_SESSION)) {
    session_start();
}

if (isset($_POST['mot']) && empty($_POST['mot'])) {
    header('Location: ../Pages/game-display.php');
}

if (isset($_POST['mot']) && !empty($_POST['mot'])) {
    $newWord = $_POST['mot'];
    $idUser = $_SESSION['idUser'];
    // Créer une nouvelle entrée avec le nouveau mot
    
    $output = [];
    $returnCode = 0;
    xdebug_break();
    exec(".\\C\\exec_WINDOWS\\add_word .\\C\\datafiles\\dic.lex $newWord .\\C\\datafiles\\$idUser .\\C\\datafiles\\words.bin", $output, $returnCode); // marche pas

    echo "Output: " . implode("\n", $output) . "\n";
    echo "Return Code: $returnCode\n";
    header('Location: gameProcessor.php');
}