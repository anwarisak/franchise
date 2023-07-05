loademployee();
filljob();
fillbranch();

$("#Addemployee").on("click", function(){
    $("#employeemodal").modal("show");
});



btnAction = "Insert";


$("#employeeform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let fristname= $("#fristname").val();
    let lastname= $("#lastname").val();
    let phone= $("#phone").val();
    let state= $("#state").val();
    let city= $("#city").val();
    let job_title_id= $("#job_title_id").val();
    let branch_id= $("#branch_id").val();
    let employee_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "fristname": fristname,
        "lastname": lastname,
        "phone": phone,
        "state": state,
        "city": city,
        "job_title_id": job_title_id,
        "branch_id": branch_id,
        "action": "register_employee",
    }
  
    }else{
        sendingData = {
            "employee_id": employee_id,
            "fristname": fristname,
            "lastname": lastname,
            "phone": phone,
            "state": state,
            "city": city,
            "job_title_id": job_title_id,
            "branch_id": branch_id,
            "action": "update_employee",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/employee_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#employeeform")[0].reset();
         $("employeemodal").modal("hide");
         loademployee();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })
 
  function filljob(){
 
    let sendingData ={
        "action": "read_job"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/employee_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['job_title_id']}">${res['name']}</option>`;
                   
                })
  
                $("#job_title_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }
 
  function fillbranch(){
 
    let sendingData ={
        "action": "read_branch"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/employee_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['branch_id']}">${res['country']}</option>`;
                   
                })
  
                $("#branch_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

 function loademployee(){
    $("#employee_table tbody").html('');
    $("#employee_table thead").html('');
   
    let sendingData ={
        "action": "read_employee"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/employee_api.php",
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

               if(r == "status"){
                if(res[r] == "paid"){
                  tr += `<td><span class="badge bg-success text-white">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge bg-danger text-white">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['employee_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['employee_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                tr+= "</tr>"
              
            })

            $("#employee_table thead").append(th);
            $("#employee_table tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_employee(employee_id){
  
    let sendingData ={
      "action": "get_employee",
      "employee_id": employee_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/employee_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['employee_id']);
               $("#fristname").val(response['fristname']);
               $("#lastname").val(response['lastname']);
               $("#phone").val(response['phone']);
               $("#state").val(response['state']);
               $("#city").val(response['city']);
               $("#branch_id").val(response['branch_id']);
               $("#job_title_id").val(response['job_title_id']);
             
               $("#employeemodal").modal("show");
           
  
          }else{
            displaymessagee("error", response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }
  
  

  function dispalaymessage(type, message){
    let success =   document.querySelector(".alert-success");
    let error =   document.querySelector(".alert-danger");
    if(type== "success"){
      error.classList= "alert alert-danger d-none";
       success.classList= "alert alert-success";
       success.innerHTML= message;
  
       setTimeout(function(){
        $("#invoicemodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#invoiceform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_employee(employee_id){
  
    let sendingData ={
      "action": "Delete_employee",
      "employee_id": employee_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/employee_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loademployee();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#employee_table").on('click', "button.update_info", function(){
    let employee_id= $(this).attr("update_id");
    get_employee(employee_id);
    console.log(invoice_id)

  })
  
  $("#employee_table").on('click', "button.delete_info", function(){
    let employee_id= $(this).attr("delete_id");
    console.log(employee_id);
    if(confirm("Are you sure To Delete")){
      Delete_employee(employee_id)
  
    }
   
  })