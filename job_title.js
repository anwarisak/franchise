loadjob_title();

$("#job_titlebutton").on("click", function(){
    $("#job_titleymodal").modal("show");
});

btnAction = "Insert";


$("#job_titleform").on("submit", function(event){
    
    event.preventDefault();
  

    let job_title_name= $("#job_title_name").val();
    let job_title_salary= $("#job_title_salary").val();
   
    let job_title_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "job_title_name": job_title_name,
        "job_title_salary": job_title_salary,
      
        "action": "register_job_title",
    }
  
    }else{
        sendingData = {
            "job_title_id": job_title_id,
            "job_title_name": job_title_name,
            "job_title_salary": job_title_salary,
          
            "action": "update_job_title",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_title_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#job_titleform")[0].reset();
         $("job_titleymodal").modal("hide");
         loadjob_title();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadjob_title(){
    $("#job_titletable tbody").html('');
    $("#job_titletable thead").html('');
   
    let sendingData ={
        "action": "read_job_title_table"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/job_title_api.php",
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
                if(res[r] == "Shipping_type"){
                  tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['job_title_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['job_title_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#job_titletable thead").append(th);
            $("#job_titletable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_job_title(job_title_id){
  
    let sendingData ={
      "action": "get_job_title",
      "job_title_id": job_title_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_title_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['job_title_id']);
              $("#job_title_name").val(response['name']);
              $("#job_title_salary").val(response['salary']);
              $("#job_titleymodal").modal('show');

          }else{
            dispalaymessage("error", response);
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
        $("#shippingtypemodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#shipingtypeform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_job_title(job_title_id){
  
    let sendingData ={
      "action": "Delete_job_title",
      "job_title_id": job_title_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_title_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
            swal("Good job!", response, "success");
            loadjob_title();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#job_titletable").on('click', "button.update_info", function(){
    let job_title_id= $(this).attr("update_id");
    get_job_title(job_title_id);

  })
  
  $("#job_titletable").on('click', "button.delete_info", function(){
    let job_title_id= $(this).attr("delete_id");
    console.log(job_title_id);
    if(confirm("Are you sure To Delete")){
      Delete_job_title(job_title_id)
  
    }
   
  })