<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    include './Modals/Product.php';
    include 'connect.php';
    $ProductsModel = new Product();
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
            echo $ProductsModel->getProduct();
            break;
        case 'POST':
            $_POST = json_decode(file_get_contents("php://input"));
            if($ProductsModel->skuExist(trim($_POST->sku))) {
                http_response_code(400);
                echo 'A product with this sku already exists!';
            }else {
                $product = [
                    'sku' => trim($_POST->sku),
                    'name' => trim($_POST->name),
                    'price' => trim($_POST->price),
                    'size' => trim($_POST->size),
                    'height' => trim($_POST->height),
                    'width' => trim($_POST->width),
                    'length' => trim($_POST->length),
                    'weight' => trim($_POST->weight)
                ];
                $added = $ProductsModel->addProduct($product);
                if($added) {
                    $_POST->id = (int) $added;
                    echo Json_encode($_POST);
                }
            }
            break;
    }