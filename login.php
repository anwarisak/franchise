<?php
session_start();
if (isset($_SESSION['username'])) {
  header('Location:index.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Skydash Admin</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="Assets/vendors/feather/feather.css">
  <link rel="stylesheet" href="Assets/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="Assets/vendors/css/vendor.bundle.base.css">
  <!-- endinject -->
  <link rel="stylesheet" href="Assets/css/vertical-layout-light/style.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="Assets/images/favicon.png" />
</head>

<body>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">

            <form id="login">
              <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                <div class="brand-logo">
                  <h4 class="font-weight-light text-center">login form</h4>

                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="alert alert-success d-none" role="alert">
                      This is a success alert—check it out!
                    </div>
                    <div class="alert alert-danger d-none" role="alert">
                      This is a danger alert—check it out!
                    </div>
                  </div>
                </div>
                <form class="pt-3">
                  <div class="form-group">
                    <input type="text" class="form-control form-control-lg" id="username" placeholder="Username">
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg" id="password" placeholder="Password">
                  </div>
                  <div class="mt-3">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">login</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">

                  </div>

                </form>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="Assets/vendors/js/vendor.bundle.base.js"></script>
  <!-- endinject -->
  <script src="login.js"></script>
  <!-- endinject -->

</body>

</html>