<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_franchise_type($conn){
    extract($_POST);
    $data = array();
    

    $query = "INSERT INTO franchise_type (name)
     values('$fname')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "franchise registered has been created");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_franchise_type($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM franchise_type";
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




function get_franchise_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM franchise_type where franchise_type_id= '$franchise_type_id'";
    $result = $conn->query($query);

    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_franchise_type($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE franchise_type set name = '$fname' WHERE franchise_type_id = '$franchise_type_id'";
     
    $result = $conn->query($query);

    if($result){

            $data = array("status" => true, "data" => "the item has been updated");

    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_franchise_type($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM franchise_type where franchise_type_id= '$franchise_type_id'";
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