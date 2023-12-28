<?php
function getIP()
{
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        $ip_address = explode(',', $ip_address);
        $ip_address = trim($ip_address[0]);
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }
    $ip_address = $_SESSION["idUser"] . '|' . $ip_address;
    return $ip_address;
}

function isValidUsername($username) {
    return preg_match('/^[A-Za-z0-9_!@#$%^&*()\-_=+{};:<.>]+$/', $username);
}

function isValidBirthYear($birthYear) {
    // un nombre à quatre chiffres
    return preg_match('/^\d{4}$/', $birthYear);
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidPassword($password) {
    if (strlen($password) < 12) {
        return false;
    }

    // au moins une majuscule, un caractère spécial et un nombre
    if (!preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password) || !preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) {
        return false;
    }

    return true;
}

function isConnected() {
    return isset($_SESSION["idUser"]) && isset($_SESSION["username"]);
}