<?php if (!isset($_SESSION)) {
    session_start();
} ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Accueil</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/navbar.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/nav.css'>
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
                            <a class="nav-link text-white" href="#">Profil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#">Messages</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#">Paramètres</a>
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
                                <a class="nav-link text-white" href="#">Profil</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Messages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Paramètres</a>
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

            <main role="main" class="col main-content">
                <!-- Le contenu principal de la page va ici -->
                <header class="section d-flex justify-content-center align-items-center ">
                    <div class="text-center">
                        <h1 class="h1 pt-5" id="home">Links Awordkening : </h1>
                        <h2 class="h2 pb-5 fst-italic">Where Words Unite</h2>
                        <button class="btn fs-2 px-4 rounded-5 bg-tan" type="submit">Jouer !</button>
                    </div>
                    <div class="" style="overflow: hidden;">
                        <!-- brouillon -->
                        <img src="../Assets/img/leaf-1.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -280px; right: 0px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-2.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -280px; right: 500px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-3.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -280px; right: 225px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-4.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -280px; right: 205px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-5.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -50px; right: 815px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-6.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -50px; right: 10px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-7.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -50px; right: 440px; overflow-x: hidden;">
                        <img src="../Assets/img/leaf-8.svg" alt="" class="position-absolute" style="width: 500px; height: 500px; bottom: -50px; right: 700px; overflow-x: hidden;">
                    </div>
                </header>
                <div class="section d-flex justify-content-center align-items-center position-relative">
                </div>
            </main>
        </div>
    </div>
    <?php
    include '../Includes/importFooter.php';
    ?>
</body>

</html>