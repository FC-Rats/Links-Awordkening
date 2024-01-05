<?php
if (!isset($_SESSION)) {
    session_start();
}

include '../Includes/_utils.php';
redirectionConnection();

if (isset($_SESSION["idUser"])) {
    include("../Includes/getUser.php");
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Changer mon profil</title>
    <?php include '../Includes/importHeader.php'; ?>
</head>
<body>
    <div class="content-wrapper">
        <a href="index.php#parametres">
            <button class="btn rounded-5 bg-coffee m-2 m-md-5 px-4 py-2 py-md-3 text-white fs-5 fs-md-4 beautiful-button">
                &larr; Retour à l'accueil
            </button>
        </a>
        <div class="container pt-5">
            <h1 class="text-center py-4">Modifier mon profil</h1>
        </div>
        <?php if (isset($_SESSION['idUser'])) { ?>
            <div class="container mh-100">
                <form class="mt-5 py-4 px-3 px-md-5 rounded-3 bg-viridian">
                    <div class="form-group row py-2">
                        <label for="pseudo" class="col-sm-4 col-form-label text-white">Pseudo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control input-modifiable beautiful-button" id="pseudo" value="<?= $user[0]["username"] ?>" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="dateNaissance" class="col-sm-4 col-form-label text-white">Année de naissance</label>
                        <div class="col-sm-8">
                            <input type="number" min="<?php echo date("Y") - 150; ?>" max="<?php echo date("Y") - 10; ?>"
                                   class="form-control input-modifiable beautiful-button" id="dateNaissance" value="<?= $user[0]["birthYear"] ?>" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="mail" class="col-sm-4 col-form-label text-white">Mail</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control input-modifiable beautiful-button" id="mail" value="<?= $user[0]["email"] ?>" readonly>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary bg-coffee border-none beautiful-button" id="boutonModifier">Modifier</button>

                        <button type="button" id="boutonAnnuler" class="btn btn-secondary d-none">Annuler</button>
                        <button type="button" id="boutonEnregistrer" class="btn btn-success d-none" data-bs-toggle="modal" data-bs-target="#modal-change-profil">
                            Enregistrer
                        </button>
                    </div>
                </form>
                <div class="modal fade " id="modal-change-profil" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content ">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Confirmez les modifications</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>

                                </p>
                                <p>Un email vous sera envoyé à <?= $user[0]["email"] ?> pour que les changements soient effectués</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <input type="button" class="btn btn-primary beautiful-button bg-viridian" id="modifyProfilButton" value="Enregistrer">
                            </div>
                        </div>
                    </div>
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
                            <input type="number" min="<?php echo date("Y") - 150;// age maximum ?>" max="<?php echo date("Y") - 10 ; //age minimum ?>"
                                   class="form-control input-modifiable beautiful-button" id="dateNaissance" value="2000" readonly>
                        </div>
                    </div>
                    <div class="form-group row py-2">
                        <label for="mail" class="col-sm-4 col-form-label text-white">Mail</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control input-modifiable beautiful-button" id="mail" value="exemple@mail.com" readonly>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary bg-coffee border-none beautiful-button" id="boutonModifier">
                            Modifier
                        </button>
                        <button type="button" id="boutonAnnuler" class="btn btn-secondary d-none">Annuler</button>
                        <button type="button" id="boutonEnregistrer" class="btn btn-success d-none">Enregistrer</button>
                    </div>
                </form>
                <div class="py-5 d-flex align-items-center justify-content-center">
                    <a href="stats.php">
                        <button class="bg-coffee text-light p-3 rounded-5 border-0">
                            Consulter mon historique de parties et mes statistiques
                        </button>
                    </a>
                </div>
                <div class="text-center position-absolute top-50 start-50 translate-middle rounded-3 d-flex flex-column justify-content-center" style="backdrop-filter: blur(20px); width: 100%; height: 100%;">
                    <h2 class="p-5">Vous devez être connecté pour accéder à cette page</h2>
                </div>
            </div>
        <?php } ?>
    </div>
    <?php include '../Includes/importFooter.php'; ?>
    <script src="../Assets/JS/formModificationForm.js"></script>
    <script src="../Assets/JS/modifyProfil.js"></script>
</body>
</html>