<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Création de compte</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="container vh-100 d-flex justify-content-center align-items-center ">
        <div class="row justify-content-center w-100 ">
            <h1 class="d-flex justify-content-center">Se connecter</h1>
            <div class="col-md-6 d-flex justify-content-center">
                <form action="../Includes/account-connection.php" method="post" class="w-75 bg-viridian p-5 rounded-3">
                    <label for="username" class="text-white">Pseudo<span class="required"> *</span></label>
                    <input type="text" id="username" name="username" placeholder="Ex : WordsKing77" required>

                    <label for="password" class="text-white">Mot de passe<span class="required"> *</span></label>
                    <div class="password-input">
                        <input type="password" id="password" name="password" placeholder="Ex : MotDeP@sseCorr3cte" required>
                        <button type="button" id="toggle-password"><img src="../Assets/img/oeil.png"></button>
                    </div>

                    <span id="erreur"></span>

                    <button type="submit" id="connection-button">Se connecter</button>

                    <div class="my-3">
                        <a id="lien-mpd-oublie" href="recover.php" class="text-light text-decoration-underline">Mot de passe oublié ?</a>
                    </div>
                    <div class="my-3">
                        <a id="lien-connexion" href="creation.php" class="text-light text-decoration-underline">Pas de compte ? S'inscrire ici ➔</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="../Assets/JS/password-toggle.js"></script>
    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>