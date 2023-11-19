<?php
session_start();
print_r($_SESSION);

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
    $_SESSION['db'] = $db;
}
$db = $_SESSION['db'];

//Récupère les statistiques
$stats = $db->query("SELECT COUNT(score) AS nombre_scores, MAX(score) AS score_max, MIN(score) AS score_min, AVG(score) AS score_moyen, SUM(score) AS score_total FROM Stats WHERE idUser = :idUser", array(array(":idUser", $_SESSION["idUser"])));
if (empty($stats)) {
    return 0;
}
return $stats;

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Home</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='../CSS/navbar.css'>
        <link rel='stylesheet' type='text/css' media='screen' href='../CSS/style.css'>
    </head>
    <body>
        <ul class="navbar">
            <li><a href="#">Jouer</a></li>
            <li><a href="#">Règle</a></li>
            <li><a href="#">Projet</a></li>
            <li><a href="#">Contact</a></li>
            <li class="dropdown">
                <a class="dropbtn"><?php echo $_SESSION["username"];?></a>
                <div class="dropdown-content">
                    <a href="">Déconnexion</a>
                </div>
            </li>
        </ul>

        <?php
        echo "Nombre de parties : " . $stats[0]['nombre_scores'] . "<br>";
        echo "Score maximum : " . $stats[0]['score_max'] . "<br>";
        echo "Score minimum : " . $stats[0]['score_min'] . "<br>";
        echo "Score moyen : " . $stats[0]['score_moyen'] . "<br>";
        echo "Score total : " . $stats[0]['score_total'] . "<br>";
        ?>
    </body>
</html>
