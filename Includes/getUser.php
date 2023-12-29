<?php
if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

$user = $db->query("SELECT * FROM LA_USER WHERE id = :idUser", array(array(':idUser', $_SESSION['idUser'])));
?>