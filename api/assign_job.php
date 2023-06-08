<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_assign_job($conn){
    extract($_POST);
    $data = array();
    

    $query = "INSERT INTO assign_job (employee_id,branch_id, shift_id, job_title_id,hours)
     values('$employee_id', '$branch_id', '$shift_id', '$job_title_id', '$hours')";

    $result = $conn->query($query);


    if($result){

       
            $data = array("status" => true, "data" => "franchise registered has been created");


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}


function read_assign_job($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT a.assign_job_id,concat(e.fristname,' ',e.lastname) AS employee_name,b.country AS branch_name,s.name AS shift_name,j.name AS job_title,a.hours,a.assign_job_date FROM assign_job a JOIN employee e ON e.employee_id=a.employee_id JOIN branch b ON b.branch_id=a.branch_id JOIN shift s ON s.shift_id=a.shift_id JOIN job_title j ON j.job_title_id=a.job_title_id";
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

function read_employee($conn){
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

function read_branch($conn){
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

function read_shift($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from shift";
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

function read_job_title($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from job_title";
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



function get_assign_job($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="SELECT * FROM assign_job where assign_job_id= '$assign_job_id'";
    $result = $conn->query($query);

    if($result){
        $row = $result->fetch_assoc();
        
        $data = array("status" => true, "data" => $row);


    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}




function update_assign_job($conn){
    extract($_POST);

    $data = array();

    $query = "UPDATE assign_job set employee_id = '$employee_id',branch_id = '$branch_id', shift_id = '$shift_id',job_title_id = '$job_title_id',hours = '$hours'
     WHERE assign_job_id = '$assign_job_id'";
     
    $result = $conn->query($query);

    if($result){

            $data = array("status" => true, "data" => "the item has been updated");

    }else{
        $data = array("status" => false, "data"=> $conn->error);
             
    }

    echo json_encode($data);
}

function Delete_assign_job($conn){
    extract($_POST);
    $data = array();
    $array_data = array();
   $query ="DELETE FROM assign_job where assign_job_id= '$assign_job_id'";
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