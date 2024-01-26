<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <title>Oublie de mot de passe</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/form.css'>
    <link rel="icon" href="../Assets/img/iconeLA.ico">
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="container section d-flex justify-content-center align-items-center ">
        <div class="row justify-content-center col-12">
            <h1 class="d-flex justify-content-center py-5">Récupération du mot de passe</h1>
            <div class="col-md-6 d-flex justify-content-center">
                <form action="../Includes/mail-password.php" method="post" class="col-lg-8 bg-viridian py-4 px-3 px-md-5 rounded-3">

                    <label for="email"class="text-white">Adresse e-mail :<span class="required"> *</span></label>
                    <input type="email" name="email" id="email" placeholder="Ex : example@gmail.com" required><br>

                    <span id="erreur"></span>

                    <input type="submit" id="connection-button" value="Envoyer le mail">

                    <div class="my-3">
                        <a id="lien-connexion" href="creation.php" class="text-light text-decoration-underline">Je me souviens de mon mot de passe :&#41; ➔</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>