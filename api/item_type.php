<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_item_type($conn){
    extract($_POST);
    $data = array();
    

    $query = "INSERT INTO item_type (name)
     values('$name')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "franchise registered has been created");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_item_type($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from item_type";
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




function get_item_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM item_type where item_type_id= '$item_type_id'";
    $result = $conn->query($query);

    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_item_type($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE item_type set name = '$name' WHERE item_type_id = '$item_type_id'";
     
    $result = $conn->query($query);

    if($result){

            $data = array("status" => true, "data" => "the item_type has been updated");

    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_item_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM item_type where item_type_id= '$item_type_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the item_type has been deleted");


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