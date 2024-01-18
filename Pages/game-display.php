<?php 
if (!isset($_SESSION)) {
    session_start();
}
include '../Includes/_utils.php';
redirectionConnection();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}
$game = $db->query("SELECT * FROM LA_GAME WHERE id = :id", array(array(':id', $_SESSION['idGame'])));
$hostUser = $db->query("SELECT username FROM LA_USER WHERE id = :id", array(array(':id', $game[0]['idHost'])));
if (isset($_SESSION['score']) && !empty($_SESSION['score'])) {
    $score = $db->query("UPDATE LA_SCORE SET score = :score WHERE idGame = :idGame", array(
        array(":score", $_SESSION['score']),
        array(":idGame", $game[0]['id'])
    ));
}

if ($_SESSION['coupRestant'] == 0) {
    header('Location: end-game.php');
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Partie</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
    <!--<link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/loadingScreen.css'>-->
</head>


<body>
<div id="loading-screen">
    <div class="spinner"></div>
</div>

<div id="main-content">
    <a href="new-game.php">
        <button class="btn rounded-5 bg-danger m-2 m-md-5 px-4 py-2 py-md-3 text-white fs-5 fs-md-4 beautiful-button">
            Quitter la partie
        </button>
    </a>
    <div class="game m-5 text-center">
        <div class="d-flex flex-wrap justify-content-evenly align-items-center">
            <div class="text-center mb-4">
                <p class="mb-2">Mode de jeu</p>
                <h2 class="fs-1"><?= $game[0]['type'] ?></h2>
            </div>
            <div class="text-center mb-4">
                <p class="mb-2">Nom de la partie</p>
                <h2 class="fs-1"><?= $game[0]['name'] ?></h2>
            </div>
            <div class="text-center mb-4">
                <p class="mb-2">ID de la partie</p>
                <h2 class="fs-1"><?= $game[0]['idJoin'] ?></h2>
            </div>
            <div class="text-center mb-4">
                <p class="mb-2">Nom de l'hôte de la partie</p>
                <h2 class="fs-1"><?= $hostUser[0]['username'] ?></h2>
            </div>
            <div class="text-center mb-4">
                <p class="mb-2">Score</p>
                <h2 class="fs-1"><?= isset($_SESSION['score']) ? $_SESSION['score'] : 0 ?></h2>
            </div>
            <div class="text-center mb-4">
                <p class="mb-2">Coups restant</p>
                <h2 class="fs-1"><?=$_SESSION['coupRestant']?></h2>
            </div>
        </div>

    </div>
        <div id="container" class="rounded-3 my-2" style="text-align: center; border: 1px var(--viridian) solid;"></div>
        <form action="../Game/addWord.php" method="post" class="text-center">
            <label for="mot" class="fs-4">Rentrez un mot :</label>
            <input name="mot" id="mot">
            <button type="submit"
                    class="btn rounded-5 bg-viridian m-2 m-md-3 px-4 py-2 py-md-3 text-white fs-5 fs-md-2 beautiful-button">
                Valider
            </button>
            <div class="container mt-5">
                <?php if (!empty($_SESSION['errorCode']) && isset($_SESSION['errorCode'])) : ?>
                    <div class="alert alert-danger bg-danger rounded-5">
                        <strong class="text-white">
                            <?= $_SESSION['errorCode']; ?>
                        </strong>
                    </div>
                <?php endif; ?>
            </div>
        </form>
    </div>
</div>

<?php include '../Includes/importFooter.php'; ?>
<script src="../Assets/JS/graphHighCharts.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/networkgraph.js"></script>
<script src="../Assets/JS/loadingScreen.js"></script>
</body>

</html>