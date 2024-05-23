<?php

declare(strict_types=1);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once('../vendor/autoload.php');

function validateJWT(array $config, string $authorizationHeader): void {
    if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
        header('HTTP/1.0 400 Bad Request');
        echo 'Token not found in request';
        exit;
    }
    
    $jwt = $matches[1];
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
        header('HTTP/1.1 401 Unauthorized');
        exit;
    }
}

$authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? 
                       $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 
                       $_SERVER['HTTP_AUTHORIZATION'] ?? 
                       apache_request_headers()['Authorization'] ?? 
                       '';

