
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
        <button type="button" class="btn btn-outline-primary  m-2" id="addassign_job" data-bs-toggle="modal" data-bs-target="#addassign_job">
       Add assign_job
         </button>
         </div>
        <table class="table table-striped table-borderless table-sm" id="assign_job_table">

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
  <div class="modal" tabindex="-1" role="dialog"id="assign_job_modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">add Assign_job</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- form user -->
        <form id="assign_job_form" enctype="multi-part/form-data">
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
                        <label for="">employee</label>
                        <select name="employee_id" id="employee_id" class="form-control">
                           
                        </select>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                        <label for="">branch</label>
                        <select name="branch_id" id="branch_id" class="form-control">
                           
                        </select>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                        <label for="">shift</label>
                        <select name="shift_id" id="shift_id" class="form-control">
                           
                        </select>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group">
                        <label for="">job_title</label>
                        <select name="job_title_id" id="job_title_id" class="form-control">
                           
                        </select>
                        </div>
                      </div>
                            
                      
                      <div class="col-sm-6">
                        <div class="form-group">
                        <label for="">hours</label>
                        <input type="text" class="form-control" id="hours" name="hours" placeholder="hours">

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

<script src="assign_job.js"></script>