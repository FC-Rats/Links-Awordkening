var name = "";
var gameType = "";
var number = 2;

$(function () {
    $("#game").on("click", function() {
        name = $("#name").val();
        gameType = $("input[name='gameType']:checked").val();
        number = $("#number").val();

        if (verfication()) {
            if (gameType === "SinglePlayer") {
                number = 1;
            }
            var game = {
                name: name,
                type: gameType,
                maxPlayer: number
            };
            $.ajax({
                url: "../Includes/new-game.php",
                type: "POST",
                dataType: "JSON",
                data: { game: JSON.stringify(game) },
                success: function (data) {
                    if (data.Insert) {
                        console.log(data.Insert);
                        //window.location.href = "/game";
                    }
                },
                error: function (data) {
                    console.log(data);
                },
            });
        }
    
    });

    $("input[name='gameType']").on("change", function() {
        gameType = $("input[name='gameType']:checked").val();
        changeRules();
    });

    changeRules();
});

function changeRules() {
    var rulesParagraph = $("#rules");

    if (gameType === "SinglePlayer") {
        rulesParagraph.text("Partie en solo, dépêchez-vous de trouver le mot !");
    } else if (gameType === "MultiPlayer") {
        rulesParagraph.text("Partie en multijoueur, dépêchez-vous de trouver le mot !");
    } else {
        rulesParagraph.text("Choississez un mode de jeu");
    }
}

function verfication() {
    if (name === "") {
        alert("Veuillez entrer un nom de partie.");
        return false;
    }

    if (gameType === undefined) {
        alert("Veuillez sélectionner un type de jeu.");
        return false;
    }

    if (number < 2 || number > 5) {
        alert("Veuillez entrer un nombre de joueurs entre 2 et 5.");
        return false;
    }

    // a enlever quand le jeu sera fini
    if (gameType === "MultiPlayer") {
        alert("Veuillez choisir un seul joueur.");
        return false;
    }

    return true;
}