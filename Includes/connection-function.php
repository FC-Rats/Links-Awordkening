<?php

class Connection {
    private $login;
    private $host;
    private $password;
    private $connec;
    private $db;

    /**
     * Permet de créer une connexion à une base de données.
     * 
     * @param String $host Le nom du host de la base de données
     * @param String $db Le nom de la base de données
     * @param String $login Le login pour la connexion à la base de données
     * @param String $password Le mot de passe pour la connexion à la base de données
     * 
     * @example Connection $db_connection = new Connection("upem.fr", "my-db", "example.login", "password");
     */
    public function __construct($host, $db, $login, $password){
        $this->host = $host;
        $this->login = $login;
        $this->password = $password;
        $this->db = $db;
        $this->connection();
    }


    public function connection() {
        try {
        $bd = new PDO('mysql:host='.$this->host.';dbname='.$this->db, 
                                    $this->login, 
                                    $this->password);
        $this->connec = $bd;
        }
        catch (PDOException $e) {
            throw new Exception("Erreur lors de la connexion à la base de données: " . $e->getMessage());
        }
    }

    /**
     * Permet de paramétrer et d'exécuter directement une requête SQL.
     * 
     * @param String $sql La requête SQL qui doit être exécutée
     * @param Array $conditions Un tableau de tableau avec le paramètre à bind et sa valeur
     * 
     * @return Array Liste contenant toute les lignes de la requête
     * 
     * @example query $sql = "SELECT * FROM table WHERE e1 = :e1 AND e2 = :e2 | $conditions = array(array(":e1", $var1), array(":e2" ; $var2))
     */
    public function query($command, Array $conditions = null){
            $query = $this->connec->prepare($command);

            if($conditions){
                foreach ($conditions as $values) {
                    $query->bindParam($values[0],$values[1]);
                }
            }

            $success = $query->execute();
            if ($success)
                return $query->fetchAll();
            else {
                throw new Exception("Erreur lors de l'exécution de la requête.");
            }
    }
}

$config = parse_ini_file('config.ini');
$db = new Connection($config['db_hostname'], $config['db_name'], $config['db_username'],  $config['db_password']);
?>