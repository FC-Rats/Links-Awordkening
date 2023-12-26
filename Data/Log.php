<?php
if (!class_exists("Log", false)) {
    class Log extends JSONable
    {
        protected $idLog;
        protected $idUser;
        protected $time;
        protected $log;
        protected $errorData;

        public function __construct()
        {
            $this->idLog = 0;
            $this->idUser = 0;
            $this->time = 0;
            $this->log = "";
            $this->errorData = null;
        }

        // Gets
        public function getIdLog():int { return $this->idLog; }
        public function getIdUser():int { return $this->idUser; }
        public function getTime():int { return $this->time; }
        public function getLog():string { return $this->log; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdLog(int $idLog) { $this->idLog = $idLog; }
        public function setIdUser(int $idUser) { $this->idUser = $idUser; }
        public function setTime(int $time) { $this->time = $time; }
        public function setLog(string $log) { $this->log = $log; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}