<?php

declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('../vendor/autoload.php');

function validateJWT(array $config, string $authorizationHeader): void {
    // Vérifier si l'en-tête d'autorisation contient un token Bearer
    if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
        // Si le token n'est pas trouvé, retourner une erreur 400 Bad Request
        header('HTTP/1.0 400 Bad Request');
        echo 'Token not found in request';
        exit;
    }
    
    $jwt = $matches[1]; // Extraire le token JWT de l'en-tête d'autorisation
    if (! $jwt) {
        header('HTTP/1.0 400 Bad Request');
        exit;
    }

    $jwt = json_decode($jwt, true);
    
    $secretKey = $config['JWT']['secretKey'];
    $serverName = $config['JWT']['domainName'];
    
    try {
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
    } catch (Exception $e) {
        header('HTTP/1.1 401 Unauthorized');
        echo 'Invalid token: ' . $e->getMessage();
        exit;
    }
    $now = new DateTimeImmutable();
    
    if ($token->iss !== $serverName ||
        $token->nbf > $now->getTimestamp() ||
        $token->exp < $now->getTimestamp())
    {
        // Vérifier les claims du token : 'iss', 'nbf', et 'exp'
        header('HTTP/1.1 401 Unauthorized');
        exit;
    }
}

// Récupérer l'en-tête d'autorisation de différentes sources possibles
$authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? 
                       $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 
                       $_SERVER['HTTP_AUTHORIZATION'] ?? 
                       apache_request_headers()['Authorization'] ?? 
                       '';

