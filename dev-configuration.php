<?php
$config = [
 'database' => [
        'host' => 'localhost',
        'db' => 'la',
        'login' => 'root',
        'password' => '',
    ],

    'PHPMailer' => [
        'mailadress' => '', //Adresse mail pour PHPMailer
        'mailpassword' => '', //Clée secrète du mail
    ],

    'links' => [
        'host' => 'https://localhost/Links-Awordkening/',
        'apiURL' => 'https://localhost/Links-Awordkening/api/',
    ],

    'JWT' => [
        'secretKey' => '', //Jeton JWT
        'domainName' => '' //Nom de domaine de la base de données
    ]
];