<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
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

