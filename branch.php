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
        <button type="button" class="btn btn-outline-primary  m-2" id="branch" data-bs-toggle="modal" data-bs-target="#branchmodal">
       Add branch
         </button>
         </div>
        <table class="table table-striped table-borderless table-sm" id="branchtable" style="width:100%">

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
  <div class="modal" tabindex="-1" role="dialog"id="branchmodal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">add branch</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body ">
        <!-- form user -->
        <form id="branchform" enctype="multi-part/form-data">
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
                        <div class="col-sm-12">
                        <div class="form-group">
                        <label for="">country</label>
                        <input type="text" class="form-control" id="country" name="country" placeholder="country">

                        </div>
                      </div>

                      </div>
                        <div class="col-sm-12">
                        <div class="form-group">
                        <label for="">address</label>
                        <input type="text" class="form-control" id="address" address="address" placeholder="address">

                        </div>
                      </div>

                      </div>
                        <div class="col-sm-12">
                        <div class="form-group">
                        <label for="">city</label>
                        <input type="text" class="form-control" id="city" city="city" placeholder="city">

                        </div>
                        </div>
      
                                    
                               
                          
                            
                            <div class="modal-footer justify-content-center">
                                <button type="submit" class="btn btn-primary">Save </button>
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

<script src="branch.js"></script>