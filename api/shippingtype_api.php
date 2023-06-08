<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_shipping_type($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO shipping_type (name)
     values('$name')";

    $result = $conn->query($query);

    if($result){

       
            $data = array("status" => true, "data" => "the shipping_type has been registered");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_shipping_type_table($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT shipping_type_id, name  from shipping_type";
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



function get_shipping_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM shipping_type where shipping_type_id= '$shipping_type_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_shipping_type($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE shipping_type set name ='$name' WHERE shipping_type_id = '$shipping_type_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the shipping_type has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_shipping_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM shipping_type where Shipping_type_id= '$Shipping_type_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the shipping_type has been deleted");


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