

$("#login").on("submit", function(event){
    
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();


    let sendingData ={


      "action": "login",
      "username": username,
      "password": password
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/login_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){

            window.location.href = "index.php"
           // console.log("goooood")
  
          }else{
            console.log("noooooo")

            displaymessagee("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
    });



  function displaymessagee(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        $("#userModel").modal("hide");
        success.classList= "alert alert-success d-none";
//        $("#userForm")[0].reset();

  
       },3000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
      $("#password").val("");

    }
  }
  