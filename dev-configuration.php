<?php
$config = [
 'database' => [
        'host' => '', //Nom de domaine de la base de données
        'db' => '', //Nom de la base de données
        'login' => '', //Nom d'utilisateur de la base de données
        'password' => '', //Mot de passe de la base de données
    ],

    'PHPMailer' => [
        'mailadress' => '', //Adresse mail pour PHPMailer
        'mailpassword' => '', //Clée secrète du mail (mot de passe d'application)
    ],

    'links' => [
        'host' => 'https://localhost/Links-Awordkening/', //Adresse du site à adapter selon son emplacement dans le serveur
        'apiURL' => 'https://localhost/Links-Awordkening/api/', //Adresse de l'API à adapter selon son emplacement dans le serveur
    ],

    'JWT' => [
        'secretKey' => '', //Jeton JWT
        'domainName' => '' //Nom de domaine de la base de données
    ]
];