<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_payment($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO payment(franchisee_id, amount, account_id, payment_method_id)
    VALUES('$franchisee_id', '$amount','$account_id','$payment_method_id')";

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
    $query = "SELECT * FROM payment";
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


function read_total_amount($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_total_amount('$franchisee_id')";
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
    $query = "SELECT f.franchisee_id,f.name as franchise_name from orders o JOIN franchisee f on o.franchisee_id=f.franchisee_id where o.status='pending'";
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
function read_payments($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT p.payment_id,f.name AS franchisee_name,p.amount,a.bank,pa.method_name FROM payment p JOIN franchisee f ON p.franchisee_id=f.franchisee_id JOIN account a ON p.account_id=a.account_id JOIN payment_method pa ON p.payment_method_id=pa.payment_method_id";
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
    extract($_POST);
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

function read_account($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from account";
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
