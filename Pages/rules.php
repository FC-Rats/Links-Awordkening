<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Règles du jeu</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="container section d-flex flex-column align-items-center justify-content-center text-start">
        <h1 class="py-4">Règles du jeu</h1>
        <div class="d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div class="d-flex align-items-center justify-content-center col-12 col-md-4">
                <img src="../Assets/img/network-image.svg" alt="Jeu de mots" title="Jeu de mots" class="img-fluid">
            </div>
            <div class="d-flex flex-column align-items-start justify-content-center col-12 col-md-7 pt-5 pt-md-0">
                <h3>Objectif du Jeu :</h3>
                <ul>
                    <li>Reliez le mot de départ au mot cible en proposant des mots similaires.</li>
                    <li>Accumulez des points basés sur la pertinence.</li>
                </ul>

                <h3>Proposition de Mots :</h3>
                <ul>
                    <li>Suggérez des mots liés sémantiquement et orthographiquement au mot précédent.</li>
                    <li>Soyez original et explorez des associations surprenantes.</li>
                </ul>

                <h3>Score et Classement :</h3>
                <ul>
                    <li>Chaque mot ajouté contribue à votre score total.</li>
                    <li>Votre score dépend de la qualité de la chaîne de mots créée.</li>
                    <li>Consultez le classement pour voir comment vous vous démarquez.</li>
                </ul>

                <h3>Parties Multijoueurs :</h3>
                <ul>
                    <li>Rejoignez des parties avec vos amis ou d'autres joueurs.</li>
                    <li>Soyez compétitif pour gagner la partie !</li>
                    <li>Découvrez les stratégies de jeu des autres participants.</li>
                </ul>

                <h3>Fin du Jeu :</h3>
                <ul>
                    <li>Atteignez un score spécifique, un nombre de mots ou jouez dans une limite de temps.</li>
                    <li>Soyez tactique pour maximiser votre score dans les limites fixées.</li>
                </ul>

                <h3>Historique et Profil :</h3>
                <ul>
                    <li>Consultez votre historique de parties et suivez vos performances.</li>
                    <li>Analysez vos succès et améliorez-vous au fil du temps.</li>
                </ul>

                <h3>Communauté :</h3>
                <ul>
                    <li>Partagez vos meilleures chaînes de mots sur les réseaux sociaux.</li>
                    <li>Echangez avec vos amis via les messages.</li>
                </ul>

                <h3>Jouer! :</h3>
                <ul>
                    <li>L'objectif principal est de s'amuser et d'explorer de nouvelles associations de mots.</li>
                    <li>Stimulez votre créativité et découvrez des chaînes de mots uniques.</li>
                </ul>
            </div>
        </div>
        <div class="py-4">
            <a href="index.php" class="my-5"><button class="bg-coffee text-light p-3 rounded-5 border-0">Retour à l'accueil</button></a>
        </div>
    </div>

    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>