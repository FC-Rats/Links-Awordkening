<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Crédits</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
<div class="container section d-flex flex-column align-items-center justify-content-center text-center">
    <h1 class="pb-4">Crédits</h1>
    <div>
        Flower Images by <a href="https://www.freepik.com/free-vector/flat-design-flower-silhouettes-illustration_25726124.htm#query=leaf%20svg&position=0&from_view=keyword&track=ais&uuid=f741b45a-df05-411b-a295-4aeb9057bf24">Freepik</a>
    </div>
    <div>
        <a href="https://www.flaticon.com/fr/icones-gratuites/utilisateur" title="utilisateur icônes">Utilisateur icônes créées par Bombasticon Studio - Flaticon</a>
    </div>
    <div class="pt-4">
        <a href="index.php" class="my-5"><button class="bg-coffee text-light p-3 rounded-5 border-0">Retour à l'accueil</button></a>
    </div>
</div>

<?php include '../Includes/importFooter.php'; ?>
</body>

</html>