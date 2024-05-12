<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

include('../Data/JSONable.php');
include('../Data/Log.php');

$response = [];

list($log, $jsonError) = Log::getJsonData($_POST["log"]);

$response ['log'] = $log;