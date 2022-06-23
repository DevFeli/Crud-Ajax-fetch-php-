<?php

require_once '../dao/ProductDao.php';

class Products{

    static public function insert($arr){
        $obj = new ProductDao();
        $data = $obj->insert($arr);
        return $data;
    }

    static public function list(){
        $obj = new ProductDao();
        $data = $obj->list();
        return $data;
    }

    static public function searchById($arr){
        $obj = new ProductDao();
        $data = $obj->searchById($arr);
        return $data;
    }

    static public function setUpdate($arr){
        $obj = new ProductDao();
        $data = $obj->update($arr);
        return $data;
    }

    static public function delet($id){
        $obj = new ProductDao();
        $data = $obj->delet($id);
        return $data;
    }

    static public function search($txt){
        $obj = new ProductDao();
        $data = $obj->search($txt);
        return $data;
    }
}