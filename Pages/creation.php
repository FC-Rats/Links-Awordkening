<?php if (!isset($_SESSION)) {
    session_start();
} 
?>

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
    <div class="container d-flex flex-column justify-content-center align-items-center py-3 bg">
        <h1 class="text-center">Création de compte</h1>
        <div class="col-12 col-md-8 bg-viridian rounded-2 d-flex justify-content-center align-items-center py-4 px-3">
            <form action="../Includes/account-creation.php" method="post" id="password-form" class="border-0 text-start col-md-8 col-12">
                <div class="mb-3">
                    <label for="username" class="form-label text-light">Pseudo<span class="required"> *</span></label>
                    <input type="text" class="form-control" name="username" id="username" placeholder="Ex : WordsKing77" required>
                </div>

                <div class="mb-3">
                    <label for="birthYear" class="form-label text-light">Année de naissance<span class="required"> *</span></label>
                    <input type="number" class="form-control" name="birthYear" id="birthYear" min="<?php echo date("Y") - 150; ?>" max="<?php echo date("Y") - 10; ?>" placeholder="Ex : 2002" required>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label text-light">Email<span class="required"> *</span></label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="Ex : example@gmail.com" required>
                    <div id="password-conditions">
                        <ul>
                            <li id="email-condition"><span id="email-check"></span> Doit être sous la forme example@mail.domain</li>
                        </ul>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label text-light">Mot de passe<span class="required"> *</span></label>
                    <div class="password-input">
                        <input type="password" id="password" name="password" placeholder="Ex : MotDeP@sseCorr3cte" required>
                        <button type="button" id="toggle-password"><img src="../Assets/img/oeil.png"></button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="confirm-password" class="form-label text-light">Confirmer le mot de passe<span class="required"> *</span></label>
                    <div class="password-input">
                        <input type="password" id="confirm-password" name="confirm-password" required>
                        <button type="button" id="toggle-confirm-password"><img src="../Assets/img/oeil.png"></button>
                    </div>
                </div>

                <div id="password-conditions">
                    <ul>
                        <li id="length-condition"><span id="length-check"></span> Doit contenir au moins 12 caractères</li>
                        <li id="uppercase-condition"><span id="uppercase-check"></span> Doit contenir au moins une majuscule</li>
                        <li id="digit-condition"><span id="digit-check"></span> Doit contenir au moins un chiffre</li>
                        <li id="special-character-condition"><span id="special-character-check"></span> Doit contenir au moins un caractère spécial</li>
                        <li id="match-condition"><span id="match-check"></span> Les mots de passe doivent être identiques</li>
                    </ul>
                </div>

                <span id="erreur"></span><br>

                <button type="submit" id="submit-button" disabled>Créer</button>

                <div class="text-center p-3">
                    <a id="lien-connexion" href="login.php" class="text-light text-decoration-underline">Déjà un compte ? Se connecter ➔</a>
                </div>
            </form>
        </div>
    </div>

    <script src="../Assets/JS/password-check.js"></script>
    <script src="../Assets/JS/password-toggle.js"></script>
    <?php include '../Includes/importFooter.php'; ?>

</body>

</html>