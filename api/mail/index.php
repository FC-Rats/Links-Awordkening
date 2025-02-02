<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('html_errors', 0);
error_reporting(E_ALL);

include_once('../cors.php');
include_once('../../configuration.php');

session_start();

if (!class_exists('Connection')) {
    include('../connection-function.php');
}

require_once('../_utils.php');
require_once('./mail-password.php');
require_once('./mail-verify.php');
require_once('./mail-update-password.php');
include('./mailer.php');

$request = json_decode(file_get_contents('php://input'), true);

if (isset($request['email']) && isset($request['action'])) {
    $email = $request['email'];
    $action = $request['action'];

    if ($action == 'recovery') {
        handlePasswordRecovery($email);
    } elseif ($action == 'update') {
        handlePasswordUpdate($email);
    } elseif ($action == 'verify') {
        handlePasswordVerify($email);
    }
    echo json_encode(['success' => true, 'redirect' => 'Email envoyé !']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit();
}

