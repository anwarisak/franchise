<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_account($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO account (number,bank, holder_name, balance)
     values('$number','$bank', '$holder_name', '$balance')";

    $result = $conn->query($query);

    if($result){

       
            $data = array("status" => true, "data" => "the account has been Created");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


// function read_all_patient_statement($conn){
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query ="CALL get_patient('$from', '$to')";
//     $result = $conn->query($query);


//     if($result){
//         while($row = $result->fetch_assoc()){
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);


//     }else{
//         $data = array("status" => false, "data"=> $conn->error);
             
//     }

//     echo json_encode($data);
// }

function viewaccount_table($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT account_id, number,bank, holder_name, balance from account";
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



function get_account($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM account where account_id= '$account_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_account($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE account set number ='$number',bank = '$bank', holder_name= '$holder_name',balance= '$balance' WHERE account_id = '$account_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the account has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_account($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM account where account_id= '$account_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the account has been deleted");


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