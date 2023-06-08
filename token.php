<?php
if (isset($_POST['btn'])){
function sendtext($phoneNumber){

    $url ="https://api.maytapi.com/api/ac12cc5c-b47d-4f80-9626-8ac0ac77f567/26114/sendMessage";

    $curl = curl_init($url);

    $headers = array(
        "Content-Type: application/json",
        "x-maytapi-key: 0b23409c-dd55-4196-90d5-bbd9aea15bf5"

    );

    $message = "kkkkkkkkkkkkkkkkkkkk";
    $message = $message;

    $postdata = array(

        'to_number' => $phoneNumber,
        'type' => 'text',
        'message' => $message,
    );


    $postdata = json_encode($postdata);

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

    $response = curl_exec($curl);
    updatesend($phoneNumber);
    var_dump($response);


}

//$phoneNumber=252617490299;

//sendtext($phoneNumber);


function customerlist(){

    $conn = mysqli_connect('localhost', 'root','', 'mytapi');
    if(mysqli_connect_errno()){
        exit('feild to connect'. mysqli_connect_error());
    }

    $sql = "SELECT * FROM customers where status = 0";
    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $phoneNumber = $row['customerphone'];
        sendtext($phoneNumber);

    }


}

//customerlist();

function updatesend($phoneNumber){
    $conn = mysqli_connect('localhost', 'root','', 'mytapi');
    if(mysqli_connect_errno()){
        exit('feild to connect'. mysqli_connect_error());
    }


    $sql = "update customers set status = '1' where customerphone = '$phoneNumber' ";
    mysqli_query($conn, $sql);
}

customerlist();


}
// function register_customer($conn){

// }

// $customerphone=252682185737;

// updatesend($customerphone);

?>
<form method="post">
    <input type="submit" name="btn" value="massage">

</form>







