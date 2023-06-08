<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_job_title($conn){
    extract($_POST);
    $data = array();
    $query = "INSERT INTO job_title (name,salary)
     values('$job_title_name','$job_title_salary')";

    $result = $conn->query($query);

    if($result){

       
            $data = array("status" => true, "data" => "the jobtitle has been registered");


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

function read_job_title_table($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT job_title_id, name,salary from job_title";
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

function read_customertable($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from customer";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function get_job_title($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM job_title where job_title_id= '$job_title_id'";
    $result = $conn->query($query);


    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_job_title($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE job_title set name ='$job_title_name',salary = '$job_title_salary' WHERE job_title_id = '$job_title_id'";
     

    $result = $conn->query($query);


    if($result){

            $data = array("status" => true, "data" => "the jobtitle has been updated");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_job_title($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM job_title where job_title_id= '$job_title_id'";
    $result = $conn->query($query);


    if($result){
   
        
        $data = array("status" => true, "data" => "the job_title has been deleted");


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