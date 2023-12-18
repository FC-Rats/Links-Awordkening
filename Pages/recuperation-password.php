<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Form</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/style.css'>
</head>
<body>
<h1>Changement de mot de passe </h1>
    <form method="POST" action="../Includes/update-password.php">
        <input type="hidden" name="token" value="<?php ENT_HTML5($_GET['token']); ?>">

        <label for="password">Mot de passe<span class="required"> *</span></label>
        <div class="password-input">
            <input type="password" id="password" name="password" placeholder="Ex : MotDeP@sseCorr3cte" required>
            <button type="button" id="toggle-password"><img src="../Assets/img/oeil.png"></button>
        </div>
        
        <label for="confirm-password">Confirmer le mot de passe<span class="required"> *</span></label>
        <div class="password-input">
            <input type="password" id="confirm-password" name="confirm-password" required>
            <button type="button" id="toggle-confirm-password"><img src="../Assets/img/oeil.png"></button>
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

        <span id="erreur"></span>

        <input type="submit" id="submit-button" value="Modifier">
    </form>

    <script src="../Assets/JS/password-toggle.js"></script>
    <script src="../Assets/JS/password-check.js"></script>
</body>
</html>