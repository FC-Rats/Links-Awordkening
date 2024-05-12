<?php
if (!class_exists("Friend", false)) {
    class Friend extends JSONable
    {
        protected $id_user;
        protected $id_friend;
        protected $state;
        protected $users;
        protected $errorData;

        public function __construct()
        {
            $this->id_user = 0;
            $this->id_friend = 0;
            $this->state = 0;
            $this->users = [];
            $this->errorData = null;
        }

        // Gets
        public function getId_user():int { return $this->id_user; }
        public function getId_friend():int { return $this->id_friend; }
        public function getState():int { return $this->state; }
        public function getUsers():array { return $this->users; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setId_user(int $id_user) { $this->id_user = $id_user; }
        public function setId_friend(int $id_friend) { $this->id_friend = $id_friend; }
        public function setState(int $state) { $this->state = $state; }
        public function setUsers(array $users) { $this->users = $users; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}