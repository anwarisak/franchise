loadjob();
$("#addjob").on("click", function(){
    $("#jobmodal").modal("show");
    console.log("office");
});

btnAction = "Insert";


$("#jobform").on("submit", function(event){
    
    event.preventDefault();
  

    let name= $("#name").val();
    let bonus= $("#bonus").val();
    let job_title_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "name": name,
        "bonus": bonus,
        "action": "register_job_title",
    }
  
    }else{
        sendingData = {
            "job_title_id": job_title_id,
            "name": name,
            "bonus": bonus,
            "action": "update_job_title",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#jobform")[0].reset();
         $("jobmodal").modal("hide");
         loadjob();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadjob(){
    $("#jobtable tbody").html('');
    $("#jobtable thead").html('');
   
    let sendingData ={
        "action": "read_job_title_table"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/job_api.php",
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
                if(res[r] == "office"){
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

            $("#jobtable thead").append(th);
            $("#jobtable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_job(job_title_id){
  
    let sendingData ={
      "action": "get_job_title",
      "job_title_id": job_title_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['job_title_id']);
    
                $("#name").val(response['name']);
                $("#bonus").val(response['bonus']);
                $("#jobmodal").modal('show');
              
                
              
  
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
        $("#jobmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#jobform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_job(job_title_id){
  
    let sendingData ={
      "action": "Delete_job_title",
      "job_title_id": job_title_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/job_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
            
            swal("Good job!", response, "success");
            loadjob();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#jobtable").on('click', "button.update_info", function(){
    let job_title_id= $(this).attr("update_id");
    get_job(job_title_id);
    console.log(job_title_id)

  })
  
  $("#jobtable").on('click', "button.delete_info", function(){
    let job_title_id= $(this).attr("delete_id");
    console.log(job_title_id);
    if(confirm("Are you sure To Delete")){
        Delete_job(job_title_id)
  
    }
   
  })