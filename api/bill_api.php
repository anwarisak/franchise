<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];


function read_employe_salary($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT SUM(Amount) as salary from charge WHERE employee_id=('$employee_id') and active=0";
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

function register_bills($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO `bill`(`employee_id`, `Amount`, `user`)
    VALUES('$employee_idd', '$amount', '$user')";
    $result = $conn->query($query);

    if ($result) {

        $data = array("status" => true, "data" => "Transaction Successfully");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }


    echo json_encode($data);
}

function read_bills($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select * from bill";
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

function read_all_employeeee($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT Distinct e.employee_id,concat(e.fristname, ' ', e.lastname) as employee_name FROM charge ch JOIN employee e on ch.employee_id=e.employee_id 
    WHERE ch.active=0";
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

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
