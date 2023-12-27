document.getElementById('boutonModifier').addEventListener('click', function() {
    // Basculer les boutons
    toggleBoutons(true);

    // Rendre les inputs modifiables
    var elements = document.getElementsByClassName('input-modifiable');
    for (var i = 0; i < elements.length; i++) {
        elements[i].readOnly = false;
    }
});

document.getElementById('boutonAnnuler').addEventListener('click', function() {
    // Basculer les boutons
    toggleBoutons(false);

    // Remettre les inputs en mode lecture seule
    setInputsReadOnly();
});

document.getElementById('boutonEnregistrer').addEventListener('click', function() {
    // Basculer les boutons
    toggleBoutons(false);

    // Remettre les inputs en mode lecture seule
    setInputsReadOnly();

    // Ici, vous pouvez ajouter la logique d'enregistrement des données
});

function toggleBoutons(modifierClique) {
    document.getElementById('boutonModifier').classList.toggle('d-none', modifierClique);
    document.getElementById('boutonAnnuler').classList.toggle('d-none', !modifierClique);
    document.getElementById('boutonEnregistrer').classList.toggle('d-none', !modifierClique);
}

function setInputsReadOnly() {
    var elements = document.getElementsByClassName('input-modifiable');
    for (var i = 0; i < elements.length; i++) {
        elements[i].readOnly = true;
    }
}
