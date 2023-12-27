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
