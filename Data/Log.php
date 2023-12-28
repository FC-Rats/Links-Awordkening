<?php
if (!class_exists("Log", false)) {
    class Log extends JSONable
    {
        protected $idUser;
        protected $dateTime;
        protected $log;
        protected $ip;
        protected $errorData;

        public function __construct()
        {
            $this->idUser = 0;
            $this->dateTime = 0;
            $this->log = "";
            $this->ip = "";
            $this->errorData = null;
        }

        // Gets
        public function getIdUser():int { return $this->idUser; }
        public function getDateTime():int { return $this->dateTime; }
        public function getLog():string { return $this->log; }
        public function getIp():string { return $this->ip; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdUser(int $idUser) { $this->idUser = $idUser; }
        public function setDateTime(int $dateTime) { $this->dateTime = $dateTime; }
        public function setLog(string $log) { $this->log = $log; }
        public function setIp(string $ip) { $this->ip = $ip; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}