<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Vérification email</title>
    <?php include '../Includes/importHeader.php'; ?>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>

<body>
    <div class="section container d-flex align-items-center justify-content-center">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <h3 class="text-start">Vérification email</h3>
            <p class="text-start">Un email vous a été envoyé pour vérifier votre compte.</p>
            <a href="login.php"><button class="bg-viridian text-light p-3 rounded-5 border-0">Retourner à la page de connexion</button></a>
        </div>
    </div>

    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>