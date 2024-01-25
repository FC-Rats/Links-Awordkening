#!/bin/bash

# Liste de mots 
words=("chat" "chien" "poisson" "lapin" "poule" "vache" "cochon" "chèvre" "mouton" "cheval" "voiture" "immeuble" "bouton" "carton" "canette" "meuble" "stylo" "classeur" "ordinateur" "téléphone" "maison" "jardin" "forêt" "montagne" "plage" "ciel" "lune" "soleil" "mer" "rivière" "pont" "arbre" "fleur" "herbe" "rocher" "nuage" "vent" "livre" "chapeau" "piano" "guitare" "télévision" "réfrigérateur" "cafetière" "cuisine" "chambre" "table" "chaise" "fenêtre" "porte" "escalier" "clé" "souris" "clavier" "plante" "lampe" "banane" "orange" "fraise" "ananas" "kiwi" "poire" "citron" "raisin" "abricot" "pomme" "orange" "kiwi" "peinture" "sculpture" "danse" "théâtre" "cinéma" "musique" "peinture" "photographie" "girafe" "lion" "tigre" "zèbre" "singe" "crocodile" "hippopotame" "rhinocéros" "ours" "tortue" "dauphin" "pingouin" "koala" "kangourou" "panda" "chameau" "autruche" "papillon" "abeille" "fourmi" "libellule" "coccinelle" "araignée" "serpent" "tortue")

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
