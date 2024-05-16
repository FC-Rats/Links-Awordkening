<?php
if (!class_exists("Friend", false)) {
    class Friend extends JSONable
    {
        protected $idUser;
        protected $idFriend;
        protected $state;
        protected $users;
        protected $errorData;

        public function __construct()
        {
            $this->idUser = 0;
            $this->idFriend = 0;
            $this->state = 0;
            $this->users = [];
            $this->errorData = null;
        }

        // Gets
        public function getIdUser():int { return $this->idUser; }
        public function getIdFriend():int { return $this->idFriend; }
        public function getState():int { return $this->state; }
        public function getUsers():array { return $this->users; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdUser(int $idUser) { $this->idUser = $idUser; }
        public function setIdFriend(int $idFriend) { $this->idFriend = $idFriend; }
        public function setState(int $state) { $this->state = $state; }
        public function setUsers(array $users) { $this->users = $users; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}