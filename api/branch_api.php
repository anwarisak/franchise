<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_branch($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO branch (country,address,city)
     values('$country','$address','$city')";

    $result = $conn->query($query);

    if($result){

       
            $data = array("status" => true, "data" => "the branch has been registered");


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

function read_branch_table($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from branch";
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

// function read_customertable($conn)
// {
//     $data = array();
//     $array_data = array();
//     $query = "SELECT * from customer";
//     $result = $conn->query($query);


//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }

function get_branch($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM branch where branch_id= '$branch_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_branch($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE branch set country ='$country',address = '$address',city = '$city' WHERE branch_id = '$branch_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the jobtitle has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_branch($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM branch where branch_id= '$branch_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the branch has been deleted");


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