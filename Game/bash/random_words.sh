#!/bin/bash

# Liste de mots 
words=("Chat" "Chien" "Poisson" "Lapin" "Poule" "Vache" "Cochon" "Chèvre" "Mouton" "Cheval")

# Vérifier le nombre d'arguments
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <n>"
    exit 1
fi

# Récupérer le nombre de mots à choisir
n=$1

# Vérifier si n est un nombre entier positif
if ! [[ "$n" =~ ^[0-9]+$ ]] || [ "$n" -lt 1 ]; then
    echo "Veuillez spécifier un nombre entier positif pour n."
    exit 1
fi

# Sélectionner n mots de manière aléatoire
selected_words=($(printf "%s\n" "${words[@]}" | shuf -n "$n"))

# Afficher les mots séparés par un espace (pour la sortie PHP)
echo "${selected_words[@]}"
