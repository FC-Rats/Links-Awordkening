<?php
    $output=null;
    $returnCode = null;
    exec("java -version 2>&1", $output, $returnCode);
    print_r($output);

    $command = "java -jar Java/target/ChainEngine-1.0-SNAPSHOT.jar 1 chien mouton";
    $returnCode = 0;

    $output=null;
    exec($command, $output, $returnCode);
    print_r($output);

    if ($returnCode === 0) {
        echo $command;
    } else {
        echo "Erreur lors de l'exécution de la commande : $command";
        // Vous pouvez également afficher les détails de l'erreur en utilisant $output
        print_r($output);
    }
?>