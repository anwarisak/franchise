

<style>

  #show{
    width: 150px;
    height: 150px;
    border: solid 1px #744547;
    border-radius: 50%;
    object-fit: cover;
  }

</style>



<?php

include 'include/header.php';
?>


  <div class="container-sc<?php 
session_start();
if(!isset($_SESSION['username'])){
    header('Location:login.php');
    die();
}

?>

<style>

  #show{
    width: 150px;
    height: 150px;
    border: solid 1px #744547;
    border-radius: 50%;
    object-fit: cover;
  }

</style>



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
        <button type="button" class="btn btn-outline-primary  m-2" id="adduser" data-bs-toggle="modal" data-bs-target="#usermodal">
       Add user
         </button>
         </div>
        <table class="table table-striped table-borderless table-sm"" id="usertable">

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
  <div class="modal" tabindex="-1" role="dialog"id="userModel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">add user</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body ">
        <!-- form user -->
        <form id="userForm" enctype="multi-part/form-data">
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
                        <label for="">username</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="username">

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
                        <label for="">password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="password">

                        </div>
                      </div>

                      <div class="col-sm-6">
                            <div class="form-group">
                                <label for="descrip">enter image</label>
                                <input type="file" class="form-control" name="image" id="image" placeholder="image">
                            </div>
                         </div>
                                    </div>
                                <div class="row">
                            <div class="col-sm-3"></div>
                         <div class="col-sm-8">
                            <div class="form-group">
                                <img id="show">
                                </div>
                         </div>
                                </div>
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center">
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



  <?php
     include 'include/footer.php';
     ?>


<script src="user.js"></script>roller">
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
        <button type="button" class="btn btn-outline-primary m-2"  data-bs-toggle="modal" data-bs-target="#usermodal">
       Add user
         </button>
         </div>
        <table class="table table-striped table-borderless table-sm" id="UserTable">

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
   <div class="modal fade" id="usermodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">User Info</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form id="userform">
      <form id="userform" enctype="multipart/form-data">
        <input type="hidden" name="update_id" id="update_id">
        <div class="row">
            

      
        <div class="col-sm-12 mt-3">
                <div class="form-group mt-4">
                <select name="emp_id" id="emp_id" class="form-control" required>
                <option value="">Select employee</option>


                </select>
                </div>

            </div>

          

            <div class="col-sm-12 mt-3">
                <div class="form-group">
                <label for="">username</label>
                <input type="text" name="username" id="username" class="form-control" required>
                </div>

            </div>

            <div class="col-sm-12 mt-3">
                <div class="form-group">
                <label for="">password</label>
                <input type="password" name="password" id="password" class="form-control">
                </div>

            </div>

            <div class="col-sm-12 mt-3">
                <div class="form-group">
                <label for="">image</label>
                <input type="file" name="image" id="image" class="form-control" required>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-8">
                <div class="form-group" required>
                <img id="show">
                </div>
            </div>
        </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit"  name="insert" class="btn btn-primary">Save Info</button>
      </div>
     </form>
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



  <?php
     include 'include/footer.php';
     ?>


<script src="user.js"></script>