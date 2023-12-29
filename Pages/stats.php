<?php
if (!isset($_SESSION)) {
    session_start();
}
include '../Includes/_utils.php';
redirectionConnection();
include("../Includes/getStats.php");
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Vos parties</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
    <link rel='stylesheet' href='../Assets/CSS/table.css'>
    <link rel='stylesheet' href='../Assets/CSS/jquery.dataTables.min.css'>
</head>

<body>

    <div class="container section d-flex flex-column justify-content-center">
    <a href="index.php#profil"><button class="btn rounded-5 bg-coffee m-5 px-4 text-white fs-5 beautiful-button" >&larr; Retour à l'accueil</button></a>
        <h1 class="d-flex justify-content-center">Vos parties</h1>

        <div class="d-flex flex-row flex-wrap col-12 bg-viridian rounded-5 my-2 py-4 justify-content-center align-items-center">
            <div class="col-12 col-sm-11 col-xl-5 d-flex flex-column justify-content-center align-items-center bg-tan ms-xl-3 rounded-5 py-4 px-1">
                <h3 class="d-flex justify-content-center">Statistiques</h3>
                <div class="col-12 col-sm-6 text-start">
                    Nombre de parties : <?= $stats[0]['nombre_scores'] ?>
                </div>
                <div class="col-12 col-sm-6 text-start">
                    Score maximum : <?= $stats[0]['score_max'] ?>
                </div>
                <div class="col-12 col-sm-6 text-start">
                    Score minimum : <?= $stats[0]['score_min'] ?>
                </div>
                <div class="col-12 col-sm-6 text-start">
                    Score moyen : <?= $stats[0]['score_moyen'] ?>
                </div>
                <div class="col-12 col-sm-6 text-start">
                    Score total : <?= $stats[0]['score_total'] ?>
                </div>
            </div>

            <div class="col-12 col-xl-6 d-flex flex-column justify-content-center align-items-center py-4">
                <div class="content-wrapper">
                    <div class="container-fluid">
                        <div class="card">
                            <h3 class="card-header">
                                Historique de vos parties
                            </h3>
                            <div class="card-datatable table-responsive">
                                <table class="dt-responsive table border-top display" id="HistoryTable" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Nom de la partie</th>
                                            <th>Type de la partie</th>
                                            <th>Date et heure de la partie</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/jquery.dataTables.min.js"></script>
    <script src="../Assets/JS/dataTables.responsive.min.js"></script>
    <script src="../Assets/JS/_utils.js"></script>
    <script src="../Assets/JS/stats.js"></script>
</body>

</html>