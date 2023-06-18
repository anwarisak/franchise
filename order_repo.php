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
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">

                                </div>
                                <div class="card-block table-border-style">
                                    <form id="order_repo_form">
                                        <div class="row">

                                            <div class="col-sm-4">
                                                <select name="type" id="type" class="form-control">
                                                    <option value="0">All</option>
                                                    <option value="custom">custom</option>

                                                </select>
                                            </div>

                                            <div class="col-sm-4">
                                                <input type="input" class="form-control" name="franc_name" id="franc_name">
                                            </div>


                                            <button type="submit" id="addnew" class="btn btn-info m-2"> add transacion</button>


                                        </div>
                                    </form>
                                    <div class="table-responsive" id="print_Area">
                                        <img width="95%" height="250px  object-fit: cover" src="Assets/images/dashboard/cargo.png" alt="">
                                        <table class="table" id="order_repo_table">
                                            <thead>

                                            </thead>
                                            <tbody>

                                            </tbody>

                                        </table>
                                    </div>
                                    <button class="btn btn-success" id="print_statement"> <i class="fa fa-print"></i>print</button>
                                    <button class="btn btn-info" id="export_statment"><i class="fa fa-file"></i> excel</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- usermodel -->


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

<script src="order_repo.js"></script>