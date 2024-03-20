<?php
if (!class_exists("Friend", false)) {
    class Friend extends JSONable
    {
        protected $idUser1;
        protected $idUser2;
        protected $areFriends;
        protected $isPending;
        protected $users;
        protected $errorData;

        public function __construct()
        {
            $this->idUser1 = 0;
            $this->idUser2 = 0;
            $this->areFriends = 0;
            $this->isPending = 0;
            $this->users = [];
            $this->errorData = null;
        }

        // Gets
        public function getIdUser1():int { return $this->idUser1; }
        public function getIdUser2():int { return $this->idUser2; }
        public function getAreFriends():int { return $this->areFriends; }
        public function getIsPending():int { return $this->isPending; }
        public function getUsers():array { return $this->users; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdUser1(int $idUser1) { $this->idUser1 = $idUser1; }
        public function setIdUser2(int $idUser2) { $this->idUser2 = $idUser2; }
        public function setAreFriends(int $areFriends) { $this->areFriends = $areFriends; }
        public function setIsPending(int $isPending) { $this->isPending = $isPending; }
        public function setUsers(array $users) { $this->users = $users; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}