<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_category($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO category (name)
     values('$category_name')";   $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "successfully Registered");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


// function read_all_category($conn){
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




function readcategory($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT *from category";
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



function getcategory($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT *FROM category where category_id= '$category_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_category($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE category set name = '$category_name' WHERE 	category_id = '$category_id'";

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "well done");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_category($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM category where category_id= '$category_id'";
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