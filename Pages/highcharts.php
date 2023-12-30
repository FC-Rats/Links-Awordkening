<?php if (!isset($_SESSION)) {
    session_start();
} 
include '../Includes/_utils.php';
redirectionConnection();
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>highcharts</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/loadingScreen.css'>

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
            <p>Nom de la partie</p>
            <h1>LesBoss77</h1>
            <div id="container" class="rounded-3 my-2" style="text-align: center; border: 1px var(--viridian) solid;"></div>
            <label for="mot" class="fs-4">Rentrez un mot :</label>
            <input type="text" id="mot" name="mot">
        </div>
    </div>


    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/graphHighCharts.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/networkgraph.js"></script>
    <script src="../Assets/JS/loadingScreen.js"></script>
</body>

</html>