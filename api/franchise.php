<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_franchise($conn){
    extract($_POST);
    $data = array();
    

    $query = "INSERT INTO franchisee (name,address, city, country,franchise_type_id)
     values('$name', '$address', '$city', '$country', '$franchise_type_id')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "franchise registered has been created");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_franchise($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT f.franchisee_id,f.name,f.address,f.city,f.country,ft.name AS franchise_type,f.reg_date FROM franchisee f JOIN franchise_type ft ON ft.franchise_type_id=f.franchise_type_id";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function read_franchise_type($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from franchise_type";
    $result = $conn->query($query);


    if($result){
        while($row = $result->fetch_assoc()){
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}



function get_franchise($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM franchisee where franchisee_id= '$franchisee_id'";
    $result = $conn->query($query);

    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_franchise($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE franchisee set name = '$name',address = '$address', city = '$city',country = '$country',franchise_type_id = '$franchise_type_id'
     WHERE franchisee_id = '$franchisee_id'";
     
    $result = $conn->query($query);

    if($result){

            $data = array("status" => true, "data" => "the item has been updated");

    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_franchise($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM franchisee where franchisee_id= '$franchisee_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the item has been deleted");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}else{
    echo json_encode(array("status" => false, "data"=> "Action Required....."));
}



?>