<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_payment($conn)
{
    extract($_POST);
    $data = array();
    $new_id = generate($conn);
    //$query = "call massage('$new_id','$customer_id','$invoice_id','$order_id','$account_id','$amount','$payment_method_id')";

    $query = "INSERT INTO payment(payment_method_id, franchisee_id,amount, account_id)
    VALUES('$payment_method_id', '$franchisee_id','$amount','$account_id')";

    $result = $conn->query($query);

    if ($result) {


        $data = array("status" => true, "data" => "you have received $amount ");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function read_payment($conn)
{
    $new_id = '';
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM payment ";
    $result = $conn->query($query);

    if ($result) {
        $num_rows = $result->num_rows;

        if ($num_rows > 0) {
            $row = $result->fetch_assoc();

            $new_id = ++$row['payment_id'];
        } else {

            $new_id = "TRAN0001";
        }
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    return $new_id;
}

function tableview($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM payment";
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


function read_franchisee($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from franchisee";
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


function read_payment_method($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from payment_method";
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


function read_amount($conn)
{
    $data = array();
    $array_data = array();
    $query = "select sum(invoice_total) from invoice where customer_id= '$customer_id'";
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




function readpayment_method($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT payment_method_id, Name from payment_method";
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
function readaccount($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT account_id,bank_name from account";
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



function get_payment($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM payment where payment_id= '$payment_id'";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function update_payment($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE payment set customer_id = '$customer_id',
    account_id = '$account_id',amount = '$amount',payment_method_id = '$payment_method_id'
     WHERE payment_id = '$payment_id'";

    $result = $conn->query($query);

    if ($result) {

        $data = array("status" => true, "data" => "the payment has been updated");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_payment($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM payment where payment_id= '$payment_id'";
    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "the invoice has been deleted");
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
