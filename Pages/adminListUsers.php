<?php if (!isset($_SESSION)) {
    session_start();
} 
include '../Includes/_utils.php';
redirectionConnection();
redirectionNotAdmin();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Liste d'utilisateurs</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
    include '../Includes/importHeader.php';
    ?>
    <link rel='stylesheet' href='../Assets/CSS/table.css'>
    <link rel='stylesheet' href='../Assets/CSS/jquery.dataTables.min.css'>
    <link rel="icon" href="../Assets/img/iconeLA.ico">
</head>

<body>
    <div class="content-wrapper">
        <a href="index.php#parametres">
            <button class="btn rounded-5 bg-coffee m-2 m-md-5 px-4 py-2 py-md-3 text-white fs-5 fs-md-4 beautiful-button">
                &larr; Retour à l'accueil
            </button>
        </a>
        <div class="container pt-5">
            <h1 class="text-center py-4">Liste des utilisateurs</h1>
        </div>
        <div class="container-fluid">
            <div class="card">
                <h5 class="card-header">
                    Utilisateurs
                </h5>
                <div class="card-datatable table-responsive">
                    <table class="dt-responsive table border-top display" id="UsersTable" style="width:100%">
                        <thead>
                            <tr>
                                <th>Identifiant utilisateur</th>
                                <th>Pseudo utilisateur</th>
                                <th>Année de naissance</th>
                                <th>Email</th>
                                <th>Compte vérifié</th>
                                <th>Compte admin</th>
                                <th>Actions</th>
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
    <script src="../Assets/JS/adminUsers.js"></script>
</body>

</html>