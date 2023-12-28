<?php if (!isset($_SESSION)) {
    session_start();
} ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Changer mon profil</title>
    <?php include '../Includes/importHeader.php'; ?>
</head>
<body>
    <div class="content-wrapper">
        <a href="index.php#parametres"><button class="btn rounded-5 bg-coffee m-5 px-4 text-white fs-5 beautiful-button" >&larr; Retour à l'accueil</button></a>
        <div class="container pt-5">
            <h1 class="text-center py-4">Modifier mon profil</h1>
        </div>
        <?php if (isset($_SESSION['idUser'])) { ?>
            <!--TODO: Max height à 100% pour que sa prenne toute la page-->
            <div class="container mh-100">
                <form class="mt-5 py-4 px-3 px-md-5 rounded-3 bg-viridian">
                    <div class="form-group row py-2">
                        <label for="pseudo" class="col-sm-4 col-form-label text-white">Pseudo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control input-modifiable beautiful-button" id="pseudo" value="Mon pseudo" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="dateNaissance" class="col-sm-4 col-form-label text-white">Année de naissance</label>
                        <div class="col-sm-8">
                            <input type="number" min="<?php echo date("Y") - 100; ?>" max="<?php echo date("Y") - 10; ?>" class="form-control input-modifiable beautiful-button" id="dateNaissance" value="2000" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="mail" class="col-sm-4 col-form-label text-white">Mail</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control input-modifiable beautiful-button" id="mail" value="exemple@mail.com" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="nbPartiesJouees" class="col-sm-4 col-form-label text-white">Nombre de parties jouées</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control input-modifiable beautiful-button" id="nbPartiesJouees" value="10" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="nbPartiesGagnees" class="col-sm-4 col-form-label text-white">Nombre de parties gagnées</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control input-modifiable beautiful-button" id="nbPartiesGagnees" value="5" readonly>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary bg-coffee border-none beautiful-button" id="boutonModifier">Modifier</button>

                        <button type="button" id="boutonAnnuler" class="btn btn-secondary d-none">Annuler</button>
                        <button type="button" id="boutonEnregistrer" class="btn btn-success d-none">Enregistrer</button>
                    </div>
                </form>
                <div class="py-5 d-flex align-items-center justify-content-center">
                    <a href="stats.php"><button class="bg-coffee text-light p-3 rounded-5 border-0">Consulter mon historique de parties et mes statistiques</button></a>
                </div>
            </div>
        <?php } else { ?>
            <div class="container mh-100 position-relative" style="user-select: none;">
                <form class="mt-5 bg-viridian p-5 rounded-3 ">
                    <div class="form-group row py-2">
                        <label for="pseudo" class="col-sm-4 col-form-label text-white">Pseudo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control input-modifiable beautiful-button" id="pseudo" value="MonPseudo" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="dateNaissance" class="col-sm-4 col-form-label text-white">Année de naissance</label>
                        <div class="col-sm-8">
                            <input type="number" min="<?php echo date("Y") - 100; ?>" max="<?php echo date("Y") - 10; ?>" class="form-control input-modifiable beautiful-button" id="dateNaissance" value="2000" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="mail" class="col-sm-4 col-form-label text-white">Mail</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control input-modifiable beautiful-button" id="mail" value="exemple@mail.com" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="nbPartiesJouees" class="col-sm-4 col-form-label text-white">Nombre de parties jouées</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control input-modifiable beautiful-button" id="nbPartiesJouees" value="10" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="nbPartiesGagnees" class="col-sm-4 col-form-label text-white">Nombre de parties gagnées</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control input-modifiable beautiful-button" id="nbPartiesGagnees" value="5" readonly>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary bg-coffee border-none beautiful-button" id="boutonModifier">Modifier</button>

                        <button type="button" id="boutonAnnuler" class="btn btn-secondary d-none">Annuler</button>
                        <button type="button" id="boutonEnregistrer" class="btn btn-success d-none">Enregistrer</button>
                    </div>
                </form>
                <div class="py-5 d-flex align-items-center justify-content-center">
                    <a href="stats.php"><button class="bg-coffee text-light p-3 rounded-5 border-0">Consulter mon historique de parties et mes statistiques</button></a>
                </div>
                <div class="text-center position-absolute top-50 start-50 translate-middle rounded-3 d-flex flex-column justify-content-center" style="backdrop-filter: blur(20px); width: 100%; height: 100%;">
                    <h2 class="p-5">Vous devez être connecté pour accéder à cette page</h2>
                    <div class="my-4">
                        <a class="btn rounded-5 bg-coffee text-white" href="login.php" tabindex="-1" aria-disabled="true">
                            Se connecter
                        </a>
                        <a class="btn rounded-5 bg-parchment" href="./creation.php" tabindex="-1" aria-disabled="true">
                            S'inscrire
                        </a>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/formModificationForm.js"></script>
</body>
</html>