<?php
if (!class_exists("User", false)) {
    class User extends JSONable
    {
        protected $id;
        protected $username;
        protected $birthYear;
        protected $email;
        protected $password;
        protected $verified;
        protected $tokenR;
        protected $scores;
        protected $errorData;

        public function __construct()
        {
            $this->id = 0;
            $this->username = "";
            $this->birthYear = 0;
            $this->email = "";
            $this->password = "";
            $this->verified = 0;
            $this->tokenR = "";
            $this->scores = [];
            $this->errorData = null;
        }

        // Gets
        public function getId():int { return $this->id; }
        public function getUsername():string { return $this->username; }
        public function getBirthYear():int { return $this->birthYear; }
        public function getEmail():string { return $this->email; }
        public function getPassword():string { return $this->password; }
        public function getVerified():int { return $this->verified; }
        public function getTokenR():string { return $this->tokenR; }
        public function getScores():array { return $this->scores; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setId(int $id) { $this->id = $id; }
        public function setUsername(string $username) { $this->username = $username; }
        public function setBirthYear(int $birthYear) { $this->birthYear = $birthYear; }
        public function setEmail(string $email) { $this->email = $email; }
        public function setPassword(string $password) { $this->password = $password; }
        public function setVerified(int $verified) { $this->verified = $verified; }
        public function setTokenR(string $tokenR) { $this->tokenR = $tokenR; }
        public function setScores(array $scores) { $this->scores = $scores; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}