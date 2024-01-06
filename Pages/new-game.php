<?php
if (!isset($_SESSION)) {
    session_start();
}
include '../Includes/_utils.php';
unsetGameSessionVariable();
include("../configuration.php");
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Mode de jeu</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/new-game.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
<div class="container new-game section d-flex justify-content-center flex-column">
    <div><a href="index.php">
            <button class="btn rounded-5 bg-coffee m-5 px-4 text-white fs-5 beautiful-button">&larr; Retour à l'accueil
            </button>
        </a>
    </div>
    <div class="row justify-content-center col-12">
        <h1 class="d-flex justify-content-center">Choisissez le mode de jeu : </h1>
        <div class="col-md-6 d-flex justify-content-center">
            <form class="col-lg-8 bg-viridian py-4 px-3 px-md-5 rounded-3">
                <div>
                    <label for="name" class="text-white">Nom de la partie<span class="required"> *</span></label>
                    <input type="text" id="name" name="name" placeholder="Ex : LesBoss77" required>
                </div>

                <div class="py-3 col-12 d-flex flex-row align-items-center justify-content-evenly text-light">
                    <div class="d-flex flex-row col-6 justify-content-evenly">
                        <label for="gameType">Un joueur</label>
                        <input type="radio" class="col-1" name="gameType" id="SinglePlayer" value="SinglePlayer">
                    </div>
                    <div class="d-flex flex-row col-6 justify-content-evenly">
                        <label for="gameType">Multijoueur</label>
                        <input type="radio" class="col-1" name="gameType" id="MultiPlayer" value="MultiPlayer">
                    </div>
                </div>

                <div class="text-light py-3">
                    <p class="fw-bold text-decoration-underline">Les règles : </p>
                    <p id="rules" class="text-center"></p>
                </div>

                <div id="container-nb-player">
                    <label for="number" class="text-white">Nombre de joueurs<span class="required"> *</span></label>
                    <input type="number" id="number" name="number" placeholder="Entre 2 et 5" min="2" max="5" required>
                </div>

                <div class="d-flex align-items-center justify-content-center">
                    <button type="button" id="game" class="mt-3 rounded-5 bg-coffee text-light beautiful-button px-4 py-2">
                        Lancer la partie
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>


<?php include '../Includes/importFooter.php'; ?>
<script>
    var link = "<?php echo $config["links"]["host"]; ?>";
</script>
<script src="../Assets/JS/new-game.js"></script>
</body>

</html>