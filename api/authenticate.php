<?php
declare(strict_types=1);
use Firebase\JWT\JWT;
require_once('../vendor/autoload.php');

function hasValidCredentials($name, $config) {
    $secret_Key  = $config['JWT']['secretKey'];
    $date   = new DateTimeImmutable();
    $expire_at     = $date->modify('+6 minutes')->getTimestamp();
    $domainName = $config['JWT']['domainName'];
    $username   = $name;

    $request_data = [
        'iat'  => $date->getTimestamp(),        
        'iss'  => $domainName,                  
        'nbf'  => $date->getTimestamp(),        
        'exp'  => $expire_at,                      
        'userName' => $username, 
    ];

    return JWT::encode(
        $request_data,      
        $secret_Key,
        'HS512'     
    );
}