<?php
if (!class_exists("JSONable", false)) {
    class JSONable implements JsonSerializable
    {

        // Méthode pour sérialiser l'objet
        public function __serialize(): array
        {
            return get_object_vars($this);
        }

        // Méthode pour désérialiser l'objet à partir d'un tableau
        public function __unserialize(array $data): void
        {
            foreach ($data as $key => $value) {
                // Si la propriété existe dans l'objet, mettre à jour sa valeur
                if (property_exists($this, $key)) {
                    $this->$key = ($value !== null) ? $value : null;
                }
            }
        }

        // Méthode pour sérialiser un tableau d'objets en JSON
        public static function jsonSerializeArray($array)
        {
            $response = [];
            foreach ($array as $element) {
                $response[] = $element->jsonSerialize();
            }
            return $response;
        }

        // Méthode pour sérialiser l'objet en JSON
        public function jsonSerialize(): mixed
        {
            $data = get_object_vars($this);
            foreach ($data as $key => $value) {
                $func = "get" . ucfirst($key);
                // Si la propriété est un tableau, sérialisez chaque élément du tableau
                if (gettype($this->$key) == "array") {
                    $dataArray = array_map(function ($element) {
                        return $element->jsonSerialize();
                    }, $this->$func());
                    $data[$key] = $dataArray;
                }
                // Convertit les types bool, int, float et string selon le besoin
                switch (gettype($this->$key)) {
                    case "bool":
                    case "int":
                        $data[$key] = (int)$value;
                        break;
                    case "float":
                        $data[$key] = (float)$value;
                        break;
                    case "string":
                        $data[$key] = (string)$value;
                        break;
                }
            }
            return $data;
        }

        /**
         * @param string|array $json
         * @return $this
         */
        public static function getJsonData($json): array
        {
            $errorData = null;

            $className = get_called_class();
            $classInstance = new $className();
            if (!is_null($json)) {
                if (is_string($json)) {
                    $json = json_decode($json);
                }
                foreach ($json as $key => $value) {
                    $setMethodName = "set" . ucfirst($key);
                    // Appelle la méthode pour définir la valeur de la propriété
                    if (method_exists($classInstance, $setMethodName)) {
                        try {
                            $classInstance->$setMethodName($value);
                        } catch (\Throwable $th) {
                            $errorData = $th;
                        }
                    }
                }
            } else {
                $errorData = "Json is null";
            }
            return array($classInstance, $errorData);
        }

        /**
         * @param string|array $json
         * @return $this[]
         */
        public static function getJsonArray($json): array
        {
            $errorData = null;
            $items = [];

            if (!is_null($json)) {
                if (is_string($json)) {
                    $json = json_decode($json);
                }
                foreach ($json as $item) {
                    // Obtenir les données de l'objet à partir de la représentation JSON
                    list($data, $errorData) = self::getJsonData($item);
                    if (is_null($errorData)) {
                        $items[] = $data;
                    } else {
                        // En cas d'erreur, arrêt de la boucle
                        break;
                    }
                }
            } else {
                $errorData = "Json is null";
            }
            return array($items, $errorData);
        }
    }
}