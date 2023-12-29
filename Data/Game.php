<?php
if (!class_exists("Game", false)) {
    class Game extends JSONable {
        protected $id;
        protected $idJoin;
        protected $idHost;
        protected $dateTime;
        protected $name;
        protected $type;
        protected $maxPlayer;
        protected $active;
        protected $users;
        protected $errorData;

        public function __construct() {
            $this->id = 0;
            $this->idJoin = "";
            $this->idHost = 0;
            $this->dateTime = "";
            $this->name = "";
            $this->type = "";
            $this->maxPlayer = 1;
            $this->active = 0;
            $this->users = [];
            $this->errorData = null;
        }

        // Gets
        public function getId():int { return $this->id; }
        public function getIdJoin():string { return $this->idJoin; }
        public function getIdHost():int { return $this->idHost; }
        public function getDateTime():string { return $this->dateTime; }
        public function getName():string { return $this->name; }
        public function getType():string { return $this->type; }
        public function getMaxPlayer():int { return $this->maxPlayer; }
        public function getActive():int { return $this->active; }
        public function getUsers():array { return $this->users; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setId(int $id) { $this->id = $id; }
        public function setIdJoin(string $idJoin) { $this->idJoin = $idJoin; }
        public function setIdHost(int $idHost) { $this->idHost = $idHost; }
        public function setDateTime(string $dateTime) { $this->dateTime = $dateTime; }
        public function setName(string $name) { $this->name = $name; }
        public function setType(string $type) { $this->type = $type; }
        public function setMaxPlayer(int $maxPlayer) { $this->maxPlayer = $maxPlayer; }
        public function setActive(int $active) { $this->active = $active; }
        public function setUsers(array $users) { $this->users = $users; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }


        public function save($db) {
            $data = [
                [':idJoin', $this->idJoin],
                [':idHost', $this->idHost],
                [':dateTime', $this->dateTime],
                [':name', $this->name],
                [':type', $this->type],
                [':maxPlayer', $this->maxPlayer],
                [':active', $this->active]
            ];

            $existingGame = $db->query("SELECT id FROM LA_GAME WHERE name = :name AND dateTime = :dateTime", array(array(":name", $this->name), array(":dateTime", $this->dateTime)));

            if ($existingGame == []) {
                // Nouvel enregistrement
                $sql = "INSERT INTO LA_GAME (idJoin, idHost, dateTime, name, type, maxPlayer, active) VALUES (:idJoin, :idHost, :dateTime, :name, :type, :maxPlayer, :active)";
            } else {
                // Enregistrement existant
                $sql = "UPDATE LA_GAME SET dateTime = :dateTime, name = :name, type = :type, maxPlayer = :maxPlayer, active = :active WHERE id = :id";
                $data[] = [':id', $existingGame[0]["id"]];
            }

            $insert = $db->query($sql, $data);

            return $insert;
        }
    }
}