<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Création de compte</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="container section d-flex justify-content-center align-items-center ">
        <div class="row justify-content-center col-12">
            <h1 class="d-flex justify-content-center">Se connecter</h1>
            <div class="col-md-6 d-flex justify-content-center">
                <form onsubmit="return false" class="col-lg-8 bg-viridian py-4 px-3 px-md-5 rounded-3">
                    <label for="username" class="text-white">Pseudo<span class="required"> *</span></label>
                    <input type="text" id="username" name="username" placeholder="Ex : WordsKing77" required>

                    <label for="password" class="text-white">Mot de passe<span class="required"> *</span></label>
                    <div class="password-input">
                        <input type="password" id="password" name="password" placeholder="Ex : MotDeP@sseCorr3cte" required>
                        <button type="button" id="toggle-password"><img src="../Assets/img/oeil.png"></button>
                    </div>


                    <button type="submit" id="connection-button">Se connecter</button>
                </form>
            </div>
        </div>
    </div>

    <script src="../Assets/JS/password-toggle.js"></script>
    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/test.js"></script>
</body>

</html>