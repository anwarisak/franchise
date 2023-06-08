<?php 
session_start();
if(!isset($_SESSION['username'])){
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
        <button type="button" class="btn btn-outline-primary  m-2" id="addcharge" data-bs-toggle="modal" data-bs-target="#usermodal">
       Add charge
         </button>
         </div>
        <table class="table table-striped table-bchargeless table-sm"" id="chargetable">

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
  <div class="modal" tabindex="-1" role="dialog"id="chargemodal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">add charge</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- form user -->
        <form id="chargeform" enctype="multi-part/form-data">
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

                      

            <div class="col-sm-4">
                <div class="form-group">
                <label for="">month</label>
                <select name="month_id" id="month_id" class="form-control">
                </select>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                <label for="">Year</label>
                <select name="year" id="year" class="form-control">
                <?php
                  $start_year = 2010; // set the starting year
                  $current_year = date('Y'); // get the current year
                  for ($year = $current_year; $year >= $start_year; $year--) {
                    echo "<option value=\"$year\">$year</option>";
                  }
                ?>
                </select>
                </div>
            </div>

            <div class="col-sm-4">
                        <div class="form-group">
                        <label for="">Description</label>
                        <input type="text" class="form-control" id="description" name="description" placeholder="description">
                        </div>
              </div>



            <div class="col-sm-4">
                <div class="form-group">
                <label for="">User</label>
                <select name="users_id" id="users_id" class="form-control">
                </select>
                </div>
            </div>
                      
                      
                    
            <div class="col-sm-4">
                <div class="form-group">
                <label for="">account</label>
                <select name="account_id" id="account_id" class="form-control">
                </select>
                </div>
            </div>

                                </div>
                            </div>
                            <div class="modal-footer justify-content-center"">
                                <button type="submit" class="btn btn-primary">Save changes</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            </form>


      </div>
    
    </div>
  </div>
</div>


        <!-- commment -->
      </div>
      <!-- commment -->
    </div>   
    <!-- commment -->
  </div>

  
  <!-- commment -->

  <!-- plugins:js -->

  


  <?php
     include 'include/footer.php';
     ?>

<script src="charge.js"></script>