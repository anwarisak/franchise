totaluser();
totalamount();
totalinvoice();
totalcustomer();
fillemployee();
loadData();
loadtop();
btnAction = "insert";

let fileimage= document.querySelector("#image");
let showInput= document.querySelector("#show");

const reader = new FileReader();

fileimage.addEventListener("change", (e)=> {
    const selectedFile= e.target.files[0];
    reader.readAsDataURL(selectedFile);
})

reader.onload= e=>{
    showInput.src= e.target.result;
}

$("#adduser").on("click", function(){
  $("#userForm")[0].reset();

    $("#userModel").modal("show");
});

$("#userForm").on("submit", function(event){
    
    event.preventDefault();

     let form_data= new FormData($("#userForm")[0]);
    form_data.append("image", $("input[type=file]")[0].files[0]);
  

    if(btnAction == "insert"){
      form_data.append("action", "register_user");
      

    }else{
   form_data.append("action", "update_user");
   loadData();
    
    }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/user_api.php",
    data : form_data,
    processData : false,
    contentType : false,
    success: function(data){
        let status= data.status;
        let response= data.data;

        if(status){
            displaymessagee("success", response);
         btnAction="insert";
        // $("#userForm")[0].reset();
         $("#usertable tr").reset();
         $("#userForm")[0].reset();  
        loadData();
        
        }else{
            displaymessagee("error", response);
          console.log("response", response);
        }
        
    },
    error: function(data){

    }

  })

})



function fillemployee(){
 
  let sendingData ={
      "action": "read_employee"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/user_api.php",
    data : sendingData,

      success : function(data){
          let status= data.status;
          let response= data.data;
          let html='';
          let tr= '';

          if(status){
              response.forEach(res=>{
                html+= `<option value="${res['employee_id']}">${res['fristname']}</option>`;
                 
              })

              $("#employee_id").append(html);

             
          }else{
            displaymessage("error", response);
          }

      },
      error: function(data){

      }

  })
}



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
        $("#userForm")[0].reset();
  
       },3000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }

  //usertable
  //get_user_list
  //users_id


  function loadData(){
    $("#usertable tr").html('');
   
    let sendingData ={
        "action": "get_user_list"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/user_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
            let th= '';
  
            if(status){
                response.forEach(res=>{
  
                   th = "<tr>";
                   for(let i in res){
                    th+= `<th>${i}</th>`;
                    
                   }
  
                   th+= "<th>Action</th></tr>";
  
                    tr += "<tr>";
                    for(let r in res){
  
                   if(r == "image"){
                   
                      tr += `<td><img style="width:40px; height:40px; border: 1px solid #e3ebe7;
                       border-radius:50%; object-fit:cover;" src="uploads/${res[r]}"></td>`;
                 
                   }else{
                    tr += `<td>${res[r]}</td>`;
                   }
  
                    }
  
                    tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['users_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                    &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['users_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                     tr+= "</tr>"
                  
                })
  
                $("#usertable thead").append(th);
                $("#usertable tbody").append(tr);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }




function loadtop(){
  $("#topcustomers tbody").html('');
  $("#topcustomers thead").html('');
 
  let sendingData ={
      "action": "get_topcustomer"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/user_api.php",
    data : sendingData,

      success : function(data){
          let status= data.status;
          let response= data.data;
          let html='';
          let tr= '';
          let th= '';
     
          
        if(status){
          response.forEach(res=>{
              tr += "<tr>";
              th = "<tr>";
              for(let r in res){
                th += `<th>${r}</th>`;

             if(r == "size"){
              tr += `<td>${res[r]} kg</td>`;
             }else{
              tr += `<td>${res[r]}</td>`;
             }

              }
        
            
          })

          $("#topcustomers thead").append(th);
          $("#topcustomers tbody").append(tr);
      }

          
      },
      error: function(data){

      }

  })
}


function fetchuserinfo(user_id){
  
  let sendingData ={
    "action": "get_user_info",
    "user_id": user_id
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

             btnAction= "update";

             $("#update_id").val(response['users_id']);
             $("#username").val(response['username']);
             $("#email").val(response['email']);
             $("#show").attr('src', `uploads/${response['image']}`);
             $("#userModel").modal("show");
         

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}


function Delete_user(user_id){
  
  let sendingData ={
    "action": "Delete_user",
    "user_id": user_id
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;

        if(status){
          loadData();
          dispalaymessage("success", response);
          loadData();

            
        }else{
          dispalaymessage("success", response);
        }

    },
    error: function(data){

    }

})
}

function totalcustomer(){
  
  let sendingData ={
    "action": "get_total_customer",
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

            document.querySelector("#totalcustomer").innerText = response['customer']

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}
function totaluser(){
  
  let sendingData ={
    "action": "get_total_user",
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

            document.querySelector("#totaluser").innerText = response['user']

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}
function totalinvoice(){
  
  let sendingData ={
    "action": "get_total_invoice",
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

            document.querySelector("#totalinvoice").innerText = response['invoice']

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}

function totalamount(){
  
  let sendingData ={
    "action": "get_total_amount",
}

$.ajax({
  method: "POST",
  dataType: "JSON",
  url: "api/user_api.php",
  data : sendingData,

    success : function(data){
        let status= data.status;
        let response= data.data;
      

        if(status){

            document.querySelector("#totalamount").innerText = response['amount']

        }else{
          displaymessagee("error", response);
        }

    },
    error: function(data){

    }

})
}


$("#usertable").on('click', "button.update_info", function(){
  let user_id= $(this).attr("update_id");
  console.log("kkk")
  fetchuserinfo(user_id)
})

$("#usertable").on('click', "button.delete_info", function(){
  let user_id= $(this).attr("delete_id");
  if(confirm("Are you sure To Delete")){
    Delete_user(user_id)

  }
 
})