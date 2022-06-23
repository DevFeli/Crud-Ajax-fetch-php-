<?php

require '../model/Products.php';

$requestJson = json_decode(file_get_contents('php://input'));//pega os dados do fetchjs
$headers = getallheaders();//pega os cabeçalho do fetchjs


switch($headers['type']){
    case 'insert':
        $response = Products::insert($requestJson);
        echo json_encode($response);
    break; 

    case 'list':
        $response = Products::list();
        echo json_encode($response);
    break; 

    case 'searchById':
        $response = Products::searchById($requestJson);
        echo json_encode($response);
    break; 

    case 'setUpdate':
        $response = Products::setUpdate($requestJson);
        echo json_encode($response);
    break; 

    case 'delet':
        $response = Products::delet($requestJson);
        echo json_encode($response);
    break; 

    case 'search':
        $response = Products::search($requestJson);
        echo json_encode($response);
    break; 
}