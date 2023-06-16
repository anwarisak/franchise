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
                            <button type="button" class="btn btn-outline-primary  m-2" id="add_bills" data-bs-toggle="modal" data-bs-target="#add_bills">
                                Add bill
                            </button>
                        </div>
                        <table class="table table-striped table-borderless table-sm" id="billTable">

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
</div>
<!-- usermodel -->

<div class="modal" tabindex="-1" role="dialog" id="bill_modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">add Bills</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- form user -->


                <form id="billform">
                    <input type="hidden" name="update_id" id="update_id">
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
                                <select name="employee_idd" id="employee_idd" class="form-control employee">
                                    <option value="0">select employee</option>
                                </select>
                            </div>

                        </div>

                        <div class="col-sm-12 mt-3">
                            <div class="from-group">
                                <input type="text" class="form-control" id="amount" placeholder="salary" readonly>
                            </div>
                        </div>

                        <div class="col-sm-12 mt-3">
                            <div class="form-group">
                                <label for="">user</label>
                                <input name="user" id="user" value="<?php echo $_SESSION['username'] ?>" class="form-control" readonly>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" name="insert" class="btn btn-primary">Save Info</button>
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

<!-- plugins:js -->


<?php
include 'include/footer.php';
?>

<script src="bill.js"></script>