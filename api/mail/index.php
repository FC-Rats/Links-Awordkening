<?php
include_once('../cors.php');

session_start();

if (!class_exists('Connection')) {
    include('../../Includes/connection-function.php');
}

