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
    <title>Traces</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
    include '../Includes/importHeader.php';
    ?>
    <link rel='stylesheet' href='../Assets/CSS/table.css'>
    <link rel='stylesheet' href='../Assets/CSS/jquery.dataTables.min.css'>
</head>

<body>
    <div class="content-wrapper">
        <div class="container pt-5">
            <a href="index.php" class="text-dark fs-5">< Retour à l'accueil</a>
            <h1 class="text-center py-4">Liste des 500 dernières traces</h1>
        </div>
        <div class="container-fluid">
            <div class="card">
                <h5 class="card-header">
                    Les 500 dernières traces
                </h5>
                <div class="card-datatable table-responsive">
                    <table class="dt-responsive table border-top display" id="LogsTable" style="width:100%">
                        <thead>
                            <tr>
                                <th>Identifiant utilisateur</th>
                                <th>Pseudo utilisateur</th>
                                <th>Trace</th>
                                <th>IP</th>
                                <th>Trace</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php
    include '../Includes/importFooter.php';
    ?>
    <script src="../Assets/JS/jquery.dataTables.min.js"></script>
    <script src="../Assets/JS/dataTables.responsive.min.js"></script>
    <script src="../Assets/JS/_utils.js"></script>
    <script src="../Assets/JS/logs.js"></script>
</body>

</html>