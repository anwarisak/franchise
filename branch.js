loadbranch();

$("#branch").on("click", function(){
    $("#branchmodal").modal("show");
});

btnAction = "Insert";


$("#branchform").on("submit", function(event){
    
    event.preventDefault();

    let country= $("#country").val();
    let address= $("#address").val();
    let city= $("#city").val();
    let branch_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "country": country,
        "address": address,
        "city": city,
        "action": "register_branch",
    }
  
    }else{
        sendingData = {
            "branch_id": branch_id,
            "country": country,
            "address": address,
            "city": city,
            "action": "update_branch",

     }
  
  }
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/branch_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#branchform")[0].reset();
         $("branchmodal").modal("hide");
         loadbranch();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadbranch(){
    $("#branchtable tbody").html('');
    $("#branchtable thead").html('');
   
    let sendingData ={
        "action": "read_branch_table"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/branch_api.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['branch_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['branch_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#branchtable thead").append(th);
            $("#branchtable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_branch(branch_id){
  
    let sendingData ={
      "action": "get_branch",
      "branch_id": branch_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/branch_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['branch_id']);
    
                $("#country").val(response['country']);
                $("#address").val(response['address']);
                $("#city").val(response['city']);
                $("#branchmodal").modal('show');

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


  function Delete_branch(branch_id){
  
    let sendingData ={
      "action": "Delete_branch",
      "branch_id": branch_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/pranch.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
            swal("Good job!", response, "success");
            loadbranch();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#branchtable").on('click', "button.update_info", function(){
    let branch_id= $(this).attr("update_id");
    get_branch(branch_id);

  })
  
  $("#branchtable").on('click', "button.delete_info", function(){
    let branch_id= $(this).attr("delete_id");
    console.log(branch_id);
    if(confirm("Are you sure To Delete")){
      Delete_branch(branch_id)
  
    }
   
  })