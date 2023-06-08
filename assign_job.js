loadassign_job();
fillbranch();
fillshift();
filljop_title();
fillemployee();

$("#addassign_job").on("click", function(){
    $("#assign_job_modal").modal("show");
});



btnAction = "Insert";


$("#assign_job_form").on("submit", function(event){
    
    event.preventDefault();
  
  
    let employee_id= $("#employee_id").val();
    let branch_id= $("#branch_id").val();
    let shift_id= $("#shift_id").val();
    let job_title_id= $("#job_title_id").val();
    let hours= $("#hours").val();
    let assign_job_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "employee_id": employee_id,
        "branch_id": branch_id,
        "shift_id": shift_id,
        "job_title_id": job_title_id,
        "hours": hours,
        "action": "register_assign_job",
    }
  
    }else{
        sendingData = {
            "assign_job_id": assign_job_id,
            "employee_id": employee_id,
            "branch_id": branch_id,
            "shift_id": shift_id,
            "job_title_id": job_title_id,
            "hours": hours,
            "action": "update_assign_job",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/assign_job.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#assign_job_form")[0].reset();
         $("assign_job_modal").modal("hide");
         loadassign_job();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
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
      url: "api/assign_job.php",
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

  function fillbranch(){
 
    let sendingData ={
        "action": "read_branch"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/assign_job.php",
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

  function fillshift(){
 
    let sendingData ={
        "action": "read_shift"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/assign_job.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['shift_id']}">${res['name']}</option>`;
                   
                })
  
                $("#shift_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function filljop_title(){
 
    let sendingData ={
        "action": "read_job_title"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/assign_job.php",
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

 function loadassign_job(){
    $("#assign_job_table tbody").html('');
    $("#assign_job_table thead").html('');
   
    let sendingData ={
        "action": "read_assign_job"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/assign_job.php",
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
                if(res[r] == "availible"){
                  tr += `<td><span class="badge bg-info text-white">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge bg-danger text-white">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['assign_job_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['assign_job_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                tr+= "</tr>"
              
            })

            $("#assign_job_table thead").append(th);
            $("#assign_job_table tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_assign_job(assign_job_id){
  
    let sendingData ={
      "action": "get_assign_job",
      "assign_job_id": assign_job_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/assign_job.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['assign_job_id']);
               $("#employee_id").val(response['employee_id']);
               $("#branch_id").val(response['branch_id']);
               $("#shift_id").val(response['shift_id']);
               $("#job_title_id").val(response['job_title_id']);
               $("#hours").val(response['hours']);
             
               $("#assign_job_modal").modal("show");
           
  
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


  function Delete_assign_job(assign_job_id){
  
    let sendingData ={
      "action": "Delete_assign_job",
      "assign_job_id": assign_job_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/assign_job.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadassign_job();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#assign_job_table").on('click', "button.update_info", function(){
    let assign_job_id= $(this).attr("update_id");
    get_assign_job(assign_job_id);
    console.log(invoice_id)

  })
  
  $("#assign_job_table").on('click', "button.delete_info", function(){
    let assign_job_id= $(this).attr("delete_id");
    console.log(assign_job_id);
    if(confirm("Are you sure To Delete")){
      Delete_assign_job(assign_job_id)
  
    }
   
  })