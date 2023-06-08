<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_charge($conn)
{
    extract($_POST);
    $data = array();
  //  $query = "INSERT INTO charges (customer_id, item_id, quantity) values('$customer_id', '$item_id', '$quantity')";
    $query = "call get_charging('$month_id', '$year', '$description', '$users_id', '$account_id')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "charge registered has been created");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}



function read_charges($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from charge";
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




function read_month($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT month_id,month_name from month";
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

function read_all_user($conn){
    $data = array();
    $array_data = array();
   $query ="select users_id, username from users";
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

function read_account($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT account_id, name from account";
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




function get_charge($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM charge where charge_id= '$charge_id'";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}




// function update_charge($conn)
// {
//     extract($_POST);

//     $data = array();

//     $query = "UPDATE charge set customer_id = '$customer_id',item_id = '$item_id', quantity = '$quantity' WHERE charge_id = '$charge_id'";


//     $result = $conn->query($query);


//     if ($result) {

//         $data = array("status" => true, "data" => "well done");
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }

// function delete_charge($conn)
// {
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//     $query = "DELETE FROM charges where charge_id= '$charge_id'";
//     $result = $conn->query($query);


//     if ($result) {


//         $data = array("status" => true, "data" => "successfully Deleted");
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }


if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}