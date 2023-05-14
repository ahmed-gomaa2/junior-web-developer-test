<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    include './Modals/Product.php';
    include 'connect.php';
    $ProductsModel = new Product();
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'POST':
            $_POST = json_decode(file_get_contents("php://input"));
            $ids = $_POST->deletedIds;
            $deleted = $ProductsModel->deleteProducts($ids);
            if($deleted) {
                echo json_encode($ids);
            }
            break;
    }