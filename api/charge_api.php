<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_charge($conn)
{
    extract($_POST);
    $data = array();
    $query = "CALL get_charging('$month_idd', '$year', '$description', '$Acount_id', '$user_id')";

    $result = $conn->query($query);

    if ($result) {

        $row = $result->fetch_assoc();
        if ($row['msg'] == 'Deny') {
            $data = array("status" => false, "data" => "Insuficance Balance");
        } elseif ($row['msg'] == 'Registered') {
            $data = array("status" => true, "data" => "transaction successfully");
        } elseif ($row['msg'] == 'NOt') {
            $data = array("status" => false, "data" => "Horay Ayaa loogu dalacay lacagta bishaan");
        }
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}



function read_charges($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT ch.charge_id,concat(e.fristname,' ',e.lastname) AS employee_name,j.name AS jop_name,ch.amount,m.month_name,ch.year,ch.description,a.bank,ch.user_id AS user,ch.active,ch.date FROM charge ch JOIN employee e ON ch.employee_id=e.employee_id JOIN job_title j ON ch.job_title_id=j.job_title_id JOIN month m ON ch.month_id=m.month_id JOIN account a ON ch.Account_id=a.account_id";
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

function read_all_user($conn)
{
    $data = array();
    $array_data = array();
    $query = "select users_id, username from users";
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

function read_account($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT account_id, bank from account";
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
