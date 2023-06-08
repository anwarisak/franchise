<?php

header("Content-type: application/json");

include '../config/conn.php';
//user statment

function get_pay($conn)
{
    extract($_POST);
    $arreydata = array();

    $message = array();
    // read all students in the database
    $query = "call  payreport()";
    // excute the query

    $result = $conn->query($query);
    // success or error
    if ($result) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }

        $message = array("status" => true, "data" => $data);
    } else {

        $message = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($message);
}

function get_user_full_fun($conn)
{
    extract($_POST);

    $data = array();
    $message = array();
    // read all students in the database
    $query = "call get_user_full('USR21', '$from', '$to')";


    // excute the query

    $result = $conn->query($query);

    // success or error

    if ($result) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }

        $message = array("status" => true, "data" => $data);
    } else {

        $message = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($message);
}



if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo Json_encode(array("status" => false, "data" => "acction is required"));
}
