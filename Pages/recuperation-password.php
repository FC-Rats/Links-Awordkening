<?php 
if (!isset($_SESSION)) {
    session_start();
} 
if (!isset($_GET['token'])) {
    header('Location: recover.php');
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <title>Modifier votre mot de passe</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <link rel="icon" href="../Assets/img/iconeLA.ico">
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="container section d-flex flex-column justify-content-center align-items-center py-3 bg">
        <h1 class="text-center py-5">Changement de mot de passe</h1>
        <div class="col-12 col-md-8 bg-viridian rounded-2 d-flex justify-content-center align-items-center py-4 px-3">
            <form action="../Includes/update-password.php" method="post" id="password-form" class="border-0 text-start col-md-8 col-12">
                <input type="hidden" name="token" id="token" value="<?php echo htmlspecialchars($_GET['token']); ?>">

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

                <input type="submit" id="submit-button" value="Modifier" disabled>
            </form>
        </div>
    </div>

    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/password-toggle.js"></script>
    <script src="../Assets/JS/password-check.js"></script>
</body>

</html>