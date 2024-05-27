<?php
if (!class_exists("Score", false)) {
    class Score extends JSONable{
        protected $idUser;
        protected $idGame;
        protected $score;
        protected $words;
        protected $errorData;

        public function __construct() {
            $this->idUser = 0;
            $this->idGame = "";
            $this->score = 0;
            $this->words = "";
            $this->errorData = null;
        }

        // Gets
        public function getIdUser():int { return $this->idUser; }
        public function getIdGame():string { return $this->idGame; }
        public function getScore():int { return $this->score; }
        public function getWords():string { return $this->words; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdUser(int $idUser) { $this->idUser = $idUser; }
        public function setIdGame(string $idGame) { $this->idGame = $idGame; }
        public function setScore(int $score) { $this->score = $score; }
        public function setWords(string $words) { $this->words = $words; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}