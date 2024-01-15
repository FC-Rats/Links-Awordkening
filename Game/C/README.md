# Bienvenue dans la partie moteur de jeu de Links Awordkening : Where Words Unite

##  Technologies utilisées pour ce module
[![My Skills](https://skillicons.dev/icons?i=c)](https://skillicons.dev)
[![My Skills](https://skillicons.dev/icons?i=github)](https://skillicons.dev)
Avec l'utilisation de l'API Word2Vec
        
        @misc{fauconnier_2015,
        author = {Fauconnier, Jean-Philippe},
        title = {French Word Embeddings},
        url = {http://fauconnier.github.io},
        year = {2015}}

## Objectif de ce module
Le module en C vise à créer et gérer des fichiers de partie pour un jeu basé sur la similarité sémantique et orthographique entre des mots. Il utilise un dictionnaire Word2Vec, optimisé avec un index lexicographique, pour calculer la similarité entre les mots. Le fichier de partie enregistre les informations essentielles du jeu, permettant l'ajout de mots et le suivi des distances entre eux. L'algorithme utilise la distance de Levenshtein pour la similarité orthographique et ajuste le score de similarité sémantique pour comparaison.

## Installation et lancement
Tous les fichiers à placer sont dans ./datafiles
- Le fichier au modèle Word2Vec (words.bin) UTILISER WORDS.bin ou renommer votre fichier words.bin et les vecteurs doivent avoir une dimension de 300
- Le dictionnaire lexicographique (dic.lex)
- le fichier de partie (game.txt)

Consultez le [MakeFile.md](./MakeFile.md) pour la génération des commandes