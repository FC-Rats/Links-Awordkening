<?php
if (!isset($_SESSION)) {
    session_start();
}
if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include '../Includes/_utils.php';

if (isset($_SESSION["idUser"])) {
    include("../Includes/getUser.php");
    include("../Includes/getStats.php");
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Accueil</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/navbar.css'>
    <?php
    include '../Includes/importHeader.php';
    ?>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-2 bg-brunswickGreen sidebar d-none d-md-block witdh" style="width: 300px; position:fixed;">
                <div class="vh-100 d-flex flex-column p-2 fs-4">
                    <ul class="nav flex-column vh-100 justify-content-evenly align-items-center">
                        <li class="nav-item">
                            <a class="nav-link text-white active" href="#">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#profil">Profil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#message">Messages</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#parametres">Paramètres</a>
                        </li>
                        <?php if (isset($_SESSION['idUser'])) { ?>
                            <li class="nav-item">
                                <a class="nav-link text-white rounded-5 bg-danger fs-6" href="../Includes/account-logout.php">Deconnexion</a>
                            </li>
                        <?php } else { ?>
                            <li class="d-flex justify-content-evenly align-items-center w-100 p-2 fs-6">
                                <a class="btn rounded-5 bg-coffee text-white" href="login.php" tabindex="-1" aria-disabled="true">
                                    Se connecter
                                </a>
                                <a class="btn rounded-5 bg-parchment" href="./creation.php" tabindex="-1" aria-disabled="true">
                                    S'inscrire
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </nav>
            <div class="d-md-none">
                <button class="btn btn-primary p-1 m-4 position-fixed bg-brunswickGreen border-0 d-flex align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><img src="../Assets/img/burger-menu.svg" alt="" style="height: 20px; width: 20px; filter: invert(1);"></button>

                <div class="offcanvas offcanvas-start bg-brunswickGreen " data-bs-scroll="true" data-bs-backdrop="static" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title text-white" id="offcanvasScrollingLabel">Menu</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column p-0">
                        <ul class="nav flex-column flex-grow-1 justify-content-evenly align-items-center fs-4">
                            <li class="nav-item">
                                <a class="nav-link text-white active" href="#">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#profil">Profil</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#message">Messages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#parametres">Paramètres</a>
                            </li>
                            <?php if (isset($_SESSION['idUser'])) { ?>
                                <li class="nav-item">
                                    <a class="nav-link text-white rounded-5 bg-danger fs-6" href="../Includes/account-logout.php">Deconnexion</a>
                                </li>
                            <?php } else { ?>
                                <li class="d-flex justify-content-evenly align-items-center w-100 p-2 fs-6">
                                    <a class="btn rounded-5 bg-coffee text-white" href="login.php" tabindex="-1" aria-disabled="true">
                                        Se connecter
                                    </a>
                                    <a class="btn rounded-5 bg-parchment" href="./creation.php" tabindex="-1" aria-disabled="true">
                                        S'inscrire
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Le contenu principal de la page va ici -->
            <main role="main" class="col main-content py-4 px-3 px-md-5">
                <img src="../Assets/img/leaf-1.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -280px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-2.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -280px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-3.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -280px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-4.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -280px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-5.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -50px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-6.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -50px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-7.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -50px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <img src="../Assets/img/leaf-8.svg" alt="" class="position-fixed" style="width: 500px; height: 500px; bottom: -50px; right: 0%; overflow-x: hidden; user-select:none; pointer-events: none; z-index:9">
                <header class="section d-flex justify-content-center align-items-center ">
                    <div class="text-center">
                        <h1 class="h1 pt-5" id="home">Links Awordkening : </h1>
                        <h2 class="h2 pb-5 fst-italic">Where Words Unite</h2>
                        <a href="new-game.php" class="text-light"><button class="btn fs-2 px-4 rounded-5 bg-tan" type="submit">Jouer !</button></a>
                    </div>
                </header>
                <div class="profil vh-100" id="profil">
                    <div class="text-center">
                        <h2 class="p-5">Mon profil</h2>
                    </div>
                    <?php if (isset($_SESSION['idUser'])) { ?>
                        <div class="d-block d-md-flex justify-content-evenly align-items-center" style="border-radius: 200px;">
                            <img src="../Assets/img/oeil.png" alt="" style="width: 125px; ">
                            <div class="d-block d-md-flex justify-content-evenly flex-column h-100">
                                <div>
                                    <p>Pseudo</p>
                                    <h3 class="fs-1"><?= $user[0]["username"] ?></h3>
                                </div>
                                <div>
                                    <p>Année de naissance</p>
                                    <h3 class="fs-1"><?= $user[0]["birthYear"] ?></h3>
                                </div>
                            </div>
                            <div class="d-block d-md-flex justify-content-evenly flex-column h-100">
                                <div>
                                    <p>Mail</p>
                                    <h3 class="fs-1"><?= $user[0]["email"] ?></h3>
                                </div>
                                <div>
                                    <p>Nombre de parties jouées</p>
                                    <h3 class="fs-1"><?= $stats[0]['nombre_scores'] ?></h3>
                                </div>
                            </div>
                        </div>
                    <div class="py-5 d-flex align-items-center justify-content-center">
                        <a href="stats.php"><button class="bg-coffee text-light p-3 rounded-5 border-0 mt-5">Consulter mon historique de parties et mes statistiques</button></a>
                    </div>
                    <?php } else { ?>
                        <p class="fst-italic text-center fs-5 ">Connectez-vous pour voir les vos données de profil.</p>
                    <?php } ?>
                </div>
                <div id="message" class="section">
                    <div class="text-center">
                        <h2 class="p-5">Messages</h2>
                        <p class="fst-italic fs-5">Fonctionnalité à venir très prochainement.</p>
                    </div>
                </div>
                <div id="parametres" class="section">
                    <div class="text-center d-flex flex-column">
                        <h2 class="p-5">Paramètres</h2>
                        <?php if (isset($_SESSION['idUser'])) { ?>
                            <a href="change-profil.php" class="my-5"><button class="bg-coffee text-light p-3 rounded-5 border-0">Modifier mon profil</button></a>
                            <a href="recover.php" class="my-5"><button class="bg-coffee text-light p-3 rounded-5 border-0">Modifier mon mot de passe</button></a>
                            <a href="logs.php" class="my-5"><button class="bg-coffee text-light p-3 rounded-5 border-0">Accéder aux 500 dernières traces</button></a>
                        <?php } else { ?>
                            <p class="fst-italic text-center fs-5 ">Connectez-vous pour voir les vos données de profil.</p>
                        <?php } ?>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <?php
    include '../Includes/importFooter.php';
    ?>
</body>

</html>