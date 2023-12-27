<?php
session_start();

if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

$last_logs = $db->query("SELECT u.username, l.IP, l.log, l.dateTime FROM LA_LOG l JOIN LA_USER u ON u.id = l.idUser LIMIT 500 ORDER BY l.dateTime");
?>