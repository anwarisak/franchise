<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_bill($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO bill (employee_id,account_id, amount)
     values('$employee', '$account','$amount')";   $result = $conn->query($query);


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



function readaccount($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from account";
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

function read_bill($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from bill";
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


function reademployee($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from employee";
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




function update_bill($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE bill set employee_id = '$employee_id',account_id = '$account_id', amount = '$amount' WHERE bill_id = '$bill_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "well done");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_bill($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM bill where bill_id= '$bill_id'";
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