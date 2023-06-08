<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_office($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO office (address,city, state)
     values('$address','$city', '$state')";

    $result = $conn->query($query);

    if($result){

       
            $data = array("status" => true, "data" => "the office has been registered");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_all_patient_statement($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
    $query ="CALL get_patient('$from', '$to')";
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

function read_office_table($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT office_id, address,city, state from office";
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



function get_office($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM office where office_id= '$office_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_office($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE office set address ='$address',city = '$city', state= '$state' WHERE office_id = '$office_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the office has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_office($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM office where office_id= '$office_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the office has been deleted");


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