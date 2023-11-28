<?php
class Score {
    private $idUser;
    private $idGame;
    private $score;
    protected $errorData;

    public function __construct() {
        $this->idUser = 0;
        $this->idGame = 0;
        $this->score = 0;
        $this->errorData = null;
    }

    // Gets
    public function getIdUser():int { return $this->idUser; }
    public function getIdGame():int { return $this->idGame; }
    public function getScore():int { return $this->score; }
    public function getErrorData() { return $this->errorData; }

    // Sets
    public function setIdUser(int $idUser) { $this->idUser = $idUser; }
    public function setIdGame(int $idGame) { $this->idGame = $idGame; }
    public function setScore(int $score) { $this->score = $score; }
    public function setErrorData($errorData) { $this->errorData = $errorData; }
}
