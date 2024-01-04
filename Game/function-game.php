<?php
    $word = array(
        "chat",
        "chien",
        "cheval",
        "éléphant",
        "tigre",
        "lion",
        "girafe",
        "singe",
        "crocodile",
        "koala",
        "kangourou",
        "panda",
        "ours",
        "serpent",
        "perroquet",
        "poulet",
        "pingouin",
        "dauphin",
        "baleine",
        "pingouin"
    );

    function getRandomWords($wordlist) {
        // Sélectionner deux indices aléatoires
        $index1 = array_rand($wordlist);
        $index2 = array_rand($wordlist);
    
        // S'assurer que les indices sont différents
        while ($index1 === $index2) {
            $index2 = array_rand($wordlist);
        }
    
        // Récupérer les deux animaux correspondants
        $word1 = $wordlist[$index1];
        $word2 = $wordlist[$index2];
    
        // Retourner le tableau avec les deux animaux
        return array($word1, $word2);
    }

    function ajouterMotAuTableau($wordarray, $word) {
        // Ajouter le mot au tableau
        $wordarray[] = $word;
    
        // Retourner le tableau mis à jour
        return $wordarray;
    }