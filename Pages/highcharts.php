<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>highcharts</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/networkgraph.js"></script>

</head>

<body>
    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/graphHighCharts.js"></script>
    <h1>Bienvenue</h1>
    <div id="container"></div>
</body>

</html>