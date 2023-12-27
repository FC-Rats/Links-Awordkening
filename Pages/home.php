<?php
if (!isset($_SESSION)) {
    session_start();
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Home</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/navbar.css'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <ul class="navbar">
        <li><a href="../Game/testExec.php">Jouer</a></li>
        <li><a href="#">Profil</a></li>
        <li><a href="#">Messages</a></li>
        <li><a href="#">Paramètres</a></li>
        <li class="dropdown">
            <a class="dropbtn"><?php echo $_SESSION["username"]; ?></a>
            <div class="dropdown-content">
                <a href="../Includes/account-logout.php">Déconnexion</a>
            </div>
        </li>
    </ul>

    <?php
    include("../Includes/getStats.php");
    echo "Nombre de parties : " . $stats[0]['nombre_scores'] . "<br>";
    echo "Score maximum : " . $stats[0]['score_max'] . "<br>";
    echo "Score minimum : " . $stats[0]['score_min'] . "<br>";
    echo "Score moyen : " . $stats[0]['score_moyen'] . "<br>";
    echo "Score total : " . $stats[0]['score_total'] . "<br>";
    ?>

    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>