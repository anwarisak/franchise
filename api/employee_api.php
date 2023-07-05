<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_employee($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO employee (fristname, lastname,phone,city,state, job_title_id,branch_id)
     values('$fristname','$lastname', '$phone','$city','$state','$job_title_id','$branch_id')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function read_job($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select * from job_title";
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

function read_branch($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select * from branch";
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




function read_employee($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select * from employee";
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








function get_employee($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM employee where employee_id= '$employee_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}




function update_customer($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE customer set fristname = '$fristname',lastname = '$lastname', phone = '$phone',address = '$address',city = '$city', state= '$state' WHERE customer_id = '$customer_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "well done");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_customer($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM customer where customer_id= '$customer_id'";
    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Deleted");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
