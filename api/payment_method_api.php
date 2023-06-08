<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_payment_method($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO payment_method (method_name)
     values('$method_name')";  
     $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered");


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




function read_payment_method($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT *from payment_method";
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



function get_customer($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM customer where customer_id= '$customer_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function get_payment_method($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM payment_method where payment_method_id= '$payment_method_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function update_payment_method($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE payment_method set method_name = '$method_name' WHERE payment_method_id = '$payment_method_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the method has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_payment_method($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM payment_method where payment_method_id= '$payment_method_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "successfully Deleted");


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