<?php
session_start();
if (!isset($_SESSION['username'])) {
  header('Location:login.php');
  die();
}

?>


<?php

include 'include/header.php';
?>


<div class="container-scroller">
  <!-- partial:partials/_navbar.html -->
  <?php
  include 'include/navbar.php';
  ?>
  <!-- commment -->
  <div class="container-fluid page-body-wrapper">

    <?php
    include 'include/sidebar.php';
    ?>
    <!-- commment -->

    <div class="container">
      <div class="row justify-content-center mt-4">
        <div class="col-sm-12">
          <div class="card">
            <div class="text-end">

              <button type="button" class="btn btn-outline-primary  m-2" id="franchisetypebtn" data-bs-toggle="modal" data-bs-target="#franchisetypemodal">
                Add franchise type
              </button>
            </div>
            <table class="table table-striped table-borderless table-sm" id="franchisetypetable">

              <thead>



              </thead>

              <tbody>


              </tbody>
            </table>




          </div>




        </div>
      </div>
    </div>
  </div>
  <!-- usermodel -->
  <div class="modal" tabindex="-1" role="dialog" id="franchisetypemodal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">add category</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- form user -->
          <form id="franchisetypeform" enctype="multi-part/form-data">
            <input type="hidden" name="update_id" id="update_id">
            <div class="container">

              <div class="row">
                <div class="col-12">
                  <div class="alert alert-success d-none" role="alert">
                    This is a success alert—check it out!
                  </div>
                  <div class="alert alert-danger d-none" role="alert">
                    This is a danger alert—check it out!
                  </div>
                </div>

          

                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="">name </label>
                    <input type="text" class="form-control" id="fname" name="fname" placeholder="name">
                  </div>
                </div>



                <div class="modal-footer justify-content-center"">
                            <button type=" submit" class="btn btn-success" id="toastTrigger">save</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
          </form>






        </div>




        <!-- Toast Container -->

        <!-- commment -->
      </div>


      <!-- commment -->
    </div>
    <!-- commment -->
  </div>

  <div class="toast-container top-0 start-0 p-4 float-left">
    <div class="toast text-bg-success border-0" id="toastAlert">
      <div class="d-flex">
        <div class="toast-body">
          <strong>Success!</strong>

          <p>This is a success toast</p>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
<!-- commment -->

<!-- plugins:js -->


<?php
include 'include/footer.php';
?>




<?php
if (isset($_POST['btn'])) {
  function sendtext($phoneNumber)
  {

    $url = "https://api.maytapi.com/api/ac12cc5c-b47d-4f80-9626-8ac0ac77f567/26114/sendMessage";

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


  function customerlist()
  {

    $conn = mysqli_connect('localhost', 'root', '', 'mytapi');
    if (mysqli_connect_errno()) {
      exit('feild to connect' . mysqli_connect_error());
    }

    $sql = "SELECT * FROM customers where status = 0";
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
      $phoneNumber = $row['customerphone'];
      sendtext($phoneNumber);
    }
  }

  //customerlist();

  function updatesend($phoneNumber)
  {
    $conn = mysqli_connect('localhost', 'root', '', 'mytapi');
    if (mysqli_connect_errno()) {
      exit('feild to connect' . mysqli_connect_error());
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
  <!-- <input type="submit" name="btn" value="massage"> -->
  <button type="submit" name="btn"> kk</button>

</form>



<script src="franchisetype.js"></script>