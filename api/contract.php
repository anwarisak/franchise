<?php

header("content-type: application/json");
include '..//config/conn.php';
// $action = $_POST['action'];

function register_contact($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO contract (franchisee_id, franchise_type_id, franchiser,comission_fee,contract_date,contract_expire)
     values('$franchisee_id', '$franchise_type_id', '$franchiser','$comission_fee','$contract_date','$contract_expire')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function loadcontract($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT c.contract_id,f.name,ft.name AS franchise_type,c.franchiser,c.comission_fee,c.contract_date,c.contract_expire FROM contract c JOIN franchisee f ON f.franchisee_id=c.franchisee_id JOIN franchise_type ft ON ft.franchise_type_id=c.franchise_type_id";
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


function read_franchise($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from franchisee";
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


function read_franchise_type($conn){
    $data = array();
    $array_data = array();
   $query ="SELECT * from franchise_type";
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


function get_contract($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM contract where contract_id= '$contract_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}




function update_contract($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE contract set franchisee_id = '$franchisee_id',franchise_type_id = '$franchise_type_id', franchiser = '$franchiser',contract_date = '$contract_date',contract_date = '$contract_date', contract_expire= '$contract_expire' WHERE contract_id = '$contract_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "well done");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_contract($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM contract where contract_id= '$contract_id'";
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
