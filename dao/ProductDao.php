<?php

class ProductDao{

    private $conn;

    public function __construct()
    {
        $this->conn = new PDO("mysql:host=localhost;dbname=crud","root","root");
    }

    public function insert($arr){
        $conn = $this->conn;
        $stmt = $conn->prepare("INSERT INTO produtos (nome,descricao,preco) VALUES (?,?,?);");
        $stmt->bindValue(1, $arr->nome);
        $stmt->bindValue(2, $arr->descricao);
        $stmt->bindValue(3, $arr->preco);
        $stmt->execute();
        if($stmt->rowCount()){
            $response = ["Erro" => false, "msg" => "registered"];
        }else{
            $response = ["Erro" => true, "msg" => "not registered"];
        }
        return $response;
    }

    public function list(){
        $conn = $this->conn;
        $stmt = $conn->prepare("SELECT * FROM produtos");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchById($id){
        $conn = $this->conn;
        $stmt = $conn->prepare("SELECT * FROM produtos WHERE id=?");
        $stmt->bindValue(1, $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($arr){
        $conn = $this->conn;
        $stmt = $conn->prepare("UPDATE produtos SET nome =?, descricao =?, preco =? WHERE id=?");
        $stmt->bindValue(1, $arr->nome);
        $stmt->bindValue(2, $arr->descricao);
        $stmt->bindValue(3, $arr->preco);
        $stmt->bindValue(4, $arr->id);
        $stmt->execute();

        if($stmt->rowCount()){
            $response = ["Erro" => false, "msg" => "updated"];
        }else{
            $response = ["Erro" => true, "msg" => "not update"];
        }
        return $response;
    }

    public function delet($id){
        $conn = $this->conn;
        $stmt = $conn->prepare("DELETE FROM produtos WHERE id = ?");
        $stmt->bindValue(1, $id);
        $stmt->execute();
        if($stmt->rowCount()){
            $response = ["Erro" => false, "msg" => "Delete"];
        }else{
            $response = ["Erro" => true, "msg" => "not delete"];
        }
        return $response;

    }

    public function search($txt){
        $conn = $this->conn;
        $stmt = $conn->prepare("SELECT * FROM produtos WHERE nome LIKE '%$txt%' OR descricao LIKE '%$txt%'");
        //$stmt->bindValue('?', $txt);
        //$stmt->bindValue(2, $txt);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}