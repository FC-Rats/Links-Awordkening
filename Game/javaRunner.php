<?php
    $output=null;
    $command = "java -jar Java/target/ChainEngine-1.0-SNAPSHOT.jar $idUser";
    $returnCode = 0;

    $output=null;
    exec($command, $output, $returnCode);
    print_r($output);

    if ($returnCode === 0) {
        echo $command;
    } else {
        echo "Erreur lors de l'exécution de la commande : $command";
        print_r($output);
    }