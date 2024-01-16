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
    exec("./C/exec_WINDOWSCadd_word ./C/datafiles/dic.lex $newWord ./C/datafiles/to/file/$idUser.txt", $output, $returnCode);

    echo "Output: " . implode("\n", $output) . "\n";
    echo "Return Code: $returnCode\n";
    header('Location: gameProcessor.php');
}