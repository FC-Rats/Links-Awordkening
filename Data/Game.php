<?php
class Game {
    private $id;
    private $idJoin;
    private $idHost;
    private $date;
    private $name;
    private $type;
    private $maxPlayer;
    private $active;
    private $users;
    protected $errorData;

    public function __construct() {
        $this->id = 0;
        $this->idJoin = 0;
        $this->idHost = 0;
        $this->date = 0;
        $this->name = "";
        $this->type = "";
        $this->maxPlayer = 1;
        $this->active = 0;
        $this->users = [];
        $this->errorData = null;
    }

    // Gets
    public function getId():int { return $this->id; }
    public function getIdJoin():int { return $this->idJoin; }
    public function getIdHost():int { return $this->idHost; }
    public function getDate():int { return $this->date; }
    public function getName():string { return $this->name; }
    public function getType():string { return $this->type; }
    public function getMaxPlayer():int { return $this->maxPlayer; }
    public function getActive():int { return $this->active; }
    public function getUsers():array { return $this->users; }
    public function getErrorData() { return $this->errorData; }

    // Sets
    public function setId(int $id) { $this->id = $id; }
    public function setIdJoin(int $idJoin) { $this->idJoin = $idJoin; }
    public function setIdHost(int $idHost) { $this->idHost = $idHost; }
    public function setDate(int $date) { $this->date = $date; }
    public function setName(string $name) { $this->name = $name; }
    public function setType(string $type) { $this->type = $type; }
    public function setMaxPlayer(int $maxPlayer) { $this->maxPlayer = $maxPlayer; }
    public function setActive(int $active) { $this->active = $active; }
    public function setUsers(array $users) { $this->users = $users; }
    public function setErrorData($errorData) { $this->errorData = $errorData; }
}