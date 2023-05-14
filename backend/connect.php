<?php
    class DbConnect {
        private $server = 'localhost';
        private $dbname = 'id20751027_products';
        private $password = 'CivilWeb1!';
        private $user = 'id20751027_admin';
        public function connect() {
            try {
                $conn = new PDO('mysql:host='.$this->server .';dbname=' . $this->dbname, $this->user, $this->password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
                echo 'Database Error: '. $e->getMessage();
            }
        }
    }
?>