<?php
function getIP($idUser = null) {
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
        $ip_address = explode(',', $ip_address);
        $ip_address = trim($ip_address[0]);
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }

    $idUser = isset($idUser) ? $idUser : $_SESSION['idUser'];

    $ip_address = $idUser . '|' . $ip_address;

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

function file_build_path(...$segments) {
    return join(DIRECTORY_SEPARATOR, $segments);
}

function redirectionConnection() {
    if (!isset($_SESSION["idUser"]) || !isset($_SESSION["username"])) {
        header('Location: ../Pages/login.php');
        exit();
    }
}

function redirectionNotAdmin() {
    if ($_SESSION['isAdmin'] != 1) {
        header('Location: ../Pages/index.php');
        exit();
    }
}


function unsetGameSessionVariable() {
    unsetWordChartSessionVariable();
    unsetScoreSessionVariable();
    unsetIdGameSessionVariable();
}

function unsetIdGameSessionVariable() {
    if (isset($_SESSION['idGame'])) {
        unset($_SESSION['idGame']);
    }
}

function unsetScoreSessionVariable() {
    if (isset($_SESSION['score'])) {
        unset($_SESSION['score']);
    }
}

function unsetWordChartSessionVariable() {
    if (isset($_SESSION['WordsChart'])) {
        unset($_SESSION['WordsChart']);
    }
}

function getQuery($sql, $conditions) {
    if (count($_GET) >= 1) {
        foreach ($_GET as $key => $value) {
            if (!isset($keys[$key])) {
                $keys[$key] = [];
            }
            $tmp = explode(",", $value);
            foreach ($tmp as $t) {
                $keys[$key][] = $t;
            }
        }
        $sql .= " WHERE ";
        $y = 0;
        foreach ($keys as $key => $values) {
            if ($y > 0) {
                $sql .= " AND ";
            }
            if (count($values) > 1) {
                $sql .= "(";
                $i = 0;
                foreach ($values as $value) {
                    $conditions[] = [":" . $key . $i, $value];
                    if ($i > 0) {
                        $sql .= " OR ";
                    }
                    $sql .= $key . " = :" . $key . $i;
                    $i++;
                }
                $sql .= ")";
            } else {
                $conditions[] = [":" . $key, $values[0]];
                $sql .= $key . " = :" . $key;
            }
            $y++;
        }
    }
    return [$sql, $conditions];
}