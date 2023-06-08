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
    <div class="main-panel">
      <div class="content-wrapper">
        <div class="row">
          <div class="col-md-12 grid-margin">
            <div class="row">
              <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                <h3 class="font-weight-bold"> Welcame <?php echo $_SESSION['username'] ?></h3>
                <h6 class="font-weight-normal mb-0"> This user was created on <?php echo  $_SESSION['date'] ?></h6>
              </div>
              <div class="col-12 col-xl-4">
                <div class="justify-content-end d-flex">
                  <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                    <button class="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      <i class="mdi mdi-calendar"></i> Today (10 Jan 2021)
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                      <a class="dropdown-item" href="#">January - March</a>
                      <a class="dropdown-item" href="#">March - June</a>
                      <a class="dropdown-item" href="#">June - August</a>
                      <a class="dropdown-item" href="#">August - November</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">

              <div class="col-md-3 mb-4 stretch-card transparent">
                <div class="card card-tale">
                  <div class="card-body">
                    <p class="mb-4">Total users</p>
                    <p class="fs-30 mb-2" id="totaluser"></p>

                    <p>10.00% (30 days)</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-4 stretch-card transparent">
                <div class="card card-dark-blue">
                  <div class="card-body">
                    <p class="mb-4">Total franchisee</p>
                    <p class="fs-30 mb-2" id="totalfranchisee"></p>
                    <p>22.00% (30 days)</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-4 stretch-card transparent">
                <div class="card card-dark-primary">
                  <div class="card-body">
                    <p class="mb-4">Total amount</p>
                    <p class="fs-30 mb-2" id="totalamount"></p>
                    <p>22.00% (30 days)</p>
                  </div>
                </div>
              </div>


              <div class="col-md-3 mb-4 stretch-card transparent">
                <div class="card card-tale">
                  <div class="card-body">
                    <p class="mb-4">Total Order</p>
                    <p class="fs-30 mb-2" id="totalorder"></p>
                    <p>22.00% (30 days)</p>
                  </div>
                </div>
              </div>

            </div>
        
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <p class="card-title mb-0">Top Payment orders</p>
                <div class="table-responsive">
                  <table class="table table-striped table-borderless" id="topcustomers">
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

        <!-- commment -->
        <?php
        include 'include/footer.php';
        ?>
        <!-- commment -->
      </div>
      <!-- commment -->
    </div>
    <!-- commment -->
  </div>
  <!-- commment -->


  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="js/off-canvas.js"></script>
  <script src="js/hoverable-collapse.js"></script>
  <script src="js/settings.js"></script>
  <script src="js/todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="js/dashboard.js"></script>


  <script src="user.js"></script>