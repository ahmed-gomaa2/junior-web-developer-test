<?php
    class Product {
        private $dbh;

        public function __construct () {
            $db = new DbConnect();
            $this->dbh = $db->connect();
        }

        // fetch all products function.
        public function getProduct(){
            $sql = 'SELECT * from products';
            $stmt = $this->dbh->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($products);
        }

        //add product function.
        public function addProduct($data){
            //Creating query to insert data to db
            $stmt = $this->dbh->prepare('INSERT INTO products (sku, name, price, size, height, width, length, weight)
                                VALUES (:sku, :name, :price, :size, :height, :width, :length, :weight)');
            //Binding data
            $stmt->bindParam(':sku', $data['sku']);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':size', $data['size']);
            $stmt->bindParam(':height', $data['height']);
            $stmt->bindParam(':width', $data['width']);
            $stmt->bindParam(':length', $data['length']);
            $stmt->bindParam(':weight', $data['weight']);

            if($stmt->execute()){
                return $this->dbh->lastInsertId();
            }else{
                return false;
            }
        }

        //Delete products function
        public function deleteProducts($product_ids){
            $ids = implode(', ', $product_ids);
            $query = "DELETE FROM products WHERE id IN ($ids)";
            $stmt = $this->dbh->prepare($query);
            if($stmt->execute()){
                return true;
            }else{
                return false;
            }
        }

        //check if product with the same sku exists
        public function skuExist($product_sku) {
            $sql = "SELECT * FROM products WHERE sku= :sku";
            $stmt = $this->dbh->prepare($sql);
            $stmt->bindParam(':sku', $product_sku);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($products, COUNT_RECURSIVE) > 0) {
                return true;
            }else {
                return false;
            }
        }
    }