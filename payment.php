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

              <button type="button" class="btn btn-outline-primary  m-2" id="addpayment" data-bs-toggle="modal" data-bs-target="#paymentmodal">
                Add paymnet
              </button>
            </div>
            <table class="table table-striped table-borderless table-sm" id="paymnettable">

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
  <div class="modal" tabindex="-1" role="dialog" id="paymentmodal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">add payment</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- form user -->
          <form id="paymentform" enctype="multi-part/form-data">
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
                    <label for="">Franchisee</label>
                    <select name="franchisee_id" id="franchisee_id" class="form-control">
                      <option value="0">select frenchaise</option>
                    </select>
                  </div>
                </div>


                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="">amount </label>
                    <input type="text" class="form-control" id="amount" name="amount" placeholder="amount" readonly>
                  </div>
                </div>



                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="">account</label>
                    <select name="account_id" id="account_id" class="form-control">
                    </select>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="">payment_method</label>
                    <select name="payment_method_id" id="payment_method_id" class="form-control">
                    </select>
                  </div>
                </div>



                <div class="modal-footer justify-content-center"">
                            <button type=" submit" class="btn btn-success" id="toastTrigger">payment</button>
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







<script src="payment.js"></script>