<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Accueil</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <?php
        include '../Includes/import.php';
    ?>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <nav class="col-2 bg-viridian sidebar d-none d-md-block witdh" style="width: 300px;">
                <div class="vh-100 d-flex flex-column p-2 fs-4">
                    <ul class="nav flex-column vh-100 justify-content-evenly align-items-center">
                        <li class="nav-item">
                            <a class="nav-link text-white active" href="#home">Accueil</a>
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
                        <li class="d-flex justify-content-evenly align-items-center w-100 p-2 fs-6">
                            <a class="btn rounded-5 bg-coffee text-white" href="login.php" tabindex="-1" aria-disabled="true">
                                Se connecter
                            </a>
                            <a class="btn rounded-5 bg-parchment" href="creation.php" tabindex="-1" aria-disabled="true">
                                S'inscrire
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="d-md-none">
                <button class="btn btn-primary p-1 m-4 position-fixed bg-viridian" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><img src="../Assets/img/burger-menu.svg" alt="" style="height: 20px; width: 20px; filter: invert(1);"></button>

                <div class="offcanvas offcanvas-start bg-viridian " data-bs-scroll="true" data-bs-backdrop="static" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title text-white" id="offcanvasScrollingLabel">Menu</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body d-flex flex-column p-0">
                    <ul class="nav flex-column flex-grow-1 justify-content-evenly align-items-center fs-4">
                        <li class="nav-item">
                            <a class="nav-link text-white active" href="#home">Accueil</a>
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
                        <li class="d-flex justify-content-evenly align-items-center w-100 p-2 fs-6">
                            <a class="btn rounded-5 bg-coffee text-white" href="login.php" tabindex="-1" aria-disabled="true">
                                Se connecter
                            </a>
                            <a class="btn rounded-5 bg-parchment" href="./creation.php" tabindex="-1" aria-disabled="true">
                                S'inscrire
                            </a>
                        </li>
                    </ul>
                  </div>
                </div>
            </div>

            <main role="main" class="col">
                <!-- Le contenu principal de la page va ici -->
                <header class="vh-100 d-flex justify-content-center align-items-center ">
                    <div class="text-center">
                      <h1 class="h1 p-5" id="home">Links Awordkening</h1>
                      <button class="btn fs-2 px-4 rounded-5 bg-tan" type="submit">Jouer !</button>
                    </div>
                </header>
            </main>
        </div>
    </div>
    <?php
        include '../Includes/importFooter.php';
    ?>
</body>
</html>
