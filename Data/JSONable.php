<?php
if (!class_exists("JSONable", false)) {
    class JSONable
    {
        /**
         * @param string|array $json
         * @param bool $emptyArrayIfNull
         * @return $this
         */
        public static function getJsonData($json, bool $emptyObjectIfNull = false): array
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
                    if (method_exists($classInstance, $setMethodName)) {
                        try {
                            $classInstance->$setMethodName($value);
                        } catch (\Throwable $th) {
                            $errorData = $th;
                        }
                    }
                }
            } else {
                if (!$emptyObjectIfNull) {
                    $errorData = "Json is null";
                }
            }
            return array($classInstance, $errorData);
        }

        /**
         * @param string|array $json
         * @param bool $emptyArrayIfNull
         * @return $this[]
         */
        public static function getJsonArray($json, bool $emptyArrayIfNull = false): array
        {
            $errorData = null;
            $items = [];

            if (!is_null($json)) {
                if (is_string($json)) {
                    $json = json_decode($json);
                }
                foreach ($json as $item) {
                    list($data, $errorData) = self::getJsonData($item, $emptyArrayIfNull);
                    if (is_null($errorData)) {
                        $items[] = $data;
                    } else {
                        break;
                    }
                }
            } else {
                if (!$emptyArrayIfNull) {
                    $errorData = "Json is null";
                }
            }
            return array($items, $errorData);
        }
    }
}
