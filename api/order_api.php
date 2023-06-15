<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_order($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO orders (franchisee_id, item_id, quantity,amount) 
    values('$franchisee_id', '$item_id', '$quantity', '$amount')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "Order registered has been created");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}



function read_orders($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT o.orders_id,f.name As franchisee_name,i.name AS item_name,o.quantity,o.amount,o.order_date FROM orders o JOIN franchisee f ON f.franchisee_id=o.franchisee_id JOIN item i ON i.item_id=o.item_id order by orders_id";
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


function read_item_price($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL get_item_price('$item_id')";
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
    $query = "SELECT franchisee_id, name from franchisee";
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

function read_item($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT item_id, name from item";
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




function get_order($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM orders where orders_id= '$orders_id'";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}




function update_order($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE orders set franchisee_id = '$franchisee_id',item_id = '$item_id', quantity = '$quantity', amount = '$amount' WHERE orders_id = '$orders_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "well done");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function delete_order($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM orders where orders_id= '$orders_id'";
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
