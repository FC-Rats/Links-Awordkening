<?php
if (!class_exists("Setting", false)) {
    class Setting extends JSONable{
        private $idUser;
        private $profilPicture;
        private $visibility;
        protected $errorData;

        public function __construct() {
            $this->idUser = 0;
            $this->profilPicture = "";
            $this->visibility = 0;
            $this->errorData = null;
        }

        // Gets
        public function getIdUser():int { return $this->idUser; }
        public function getProfilPicture():string { return $this->profilPicture; }
        public function getVisibility():int { return $this->visibility; }
        public function getErrorData() { return $this->errorData; }

        // Sets
        public function setIdUser(int $idUser) { $this->idUser = $idUser; }
        public function setProfilPicture(string $profilPicture) { $this->profilPicture = $profilPicture; }
        public function setVisibility(int $visibility) { $this->visibility = $visibility; }
        public function setErrorData($errorData) { $this->errorData = $errorData; }
    }
}