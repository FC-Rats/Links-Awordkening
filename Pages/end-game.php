<?php if (!isset($_SESSION)) {
    session_start();
}
include '../Includes/_utils.php';
redirectionConnection();
if (!isset($_SESSION['score'])) {
    header('Location: new-game.php');
    exit();
}
if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}
$game = $db->query("SELECT * FROM LA_GAME WHERE id = :id", array(array(':id', $_SESSION['idGame'])));
if (!empty($game)) {
    $score = $db->query("UPDATE LA_SCORE SET score = :score WHERE idUser = :idUser AND idGame = :idGame;", array(
        array(":score", $_SESSION['score']),
        array(":idUser", $_SESSION['idUser']),
        array(":idGame", $game[0]['id'])
    ));
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fin de partie</title>
    <?php include '../Includes/importHeader.php'; ?>
</head>
<body>
<div class="container section d-flex justify-content-evenly flex-column text-center ">
    <h1 class="fs-1">Fin de partie</h1>

    <p class="fs-4">Vous avez fait un score de <span class="fs-1 fw-bold"><?= $_SESSION['score'] ?></span> points !</p>

    <a href="index.php">
        <button class="btn rounded-5 bg-coffee m-5 px-4 text-white fs-5 beautiful-button">&larr; Retour à l'écran
            principal
        </button>
    </a>
</div>

<?php include '../Includes/importFooter.php'; ?>
</body>
</html>