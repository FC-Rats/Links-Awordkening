<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Assets/CSS/new-game.css'>
    <?php include '../Includes/importHeader.php'; ?>
</head>

<body>
    <div class="new-game container d-flex flex-column align-items-center justify-content-center">
        <h1 class="pb-5">Choisissez le mode de jeu : </h1>
        <div class="col-8 p-3 py-5 card-new-game rounded-3 d-flex align-items-center justify-content-center">
            <form class="col-8 d-flex flex-column align-items-center justify-content-center text-light">
                <div class="py-2 col-12 d-flex flex-row align-items-center justify-content-center">
                    <input type="text" class="col-6 rounded-3 border-0" name="name" id="name" value="" placeholder="Nom de la partie">
                    <div class="ms-3 col-2 d-flex align-items-center justify-content-center rounded-pill">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
                <div class="py-2 col-12 d-flex flex-row align-items-center justify-content-center">
                    <label for="name">Un joueur</label>
                    <input class="ms-1 me-3" type="radio" name="gameType" id="p" value="p">
                    <label for="name">Multijoueur</label>
                    <input class="ms-1" type="radio" name="gameType" id="mp" value="mp">
                </div>
                <div class="py-2 col-12 d-flex flex-row align-items-center justify-content-center" id="explication-rules">
                    <p>A faire dynamiquement</p>
                </div>
                <div class="py-2 col-12 d-flex flex-row align-items-center justify-content-center">
                    <label for="nbPlayer" class="col-4">Nombre de joueurs :</label>
                    <input type="text" class="ms-2 col-8 rounded-3 border-0" name="nbPlayer" id="name" value="" placeholder="Nom de la partie">
                </div>
                <input class="rounded-5 border-0 px-3 py-2 mt-3 text-light fw-bold" type="submit" value="Lancer">
            </form>
        </div>
    </div>
    <?php include '../Includes/importFooter.php'; ?>
</body>

</html>