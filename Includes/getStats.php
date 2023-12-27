<?php
if (!class_exists('Connection')) {
    include('../Includes/connection-function.php');
}

$stats = $db->query("SELECT COUNT(score) AS nombre_scores, MAX(score) AS score_max, MIN(score) AS score_min, AVG(score) AS score_moyen, SUM(score) AS score_total FROM LA_SCORE WHERE idUser = :idUser", array(array(":idUser", $_SESSION["idUser"])));
?>