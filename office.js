loadoffice();
$("#addoffce").on("click", function(){
    $("#officemodal").modal("show");
    console.log("office");
});

btnAction = "Insert";


$("#officeform").on("submit", function(event){
    
    event.preventDefault();
  

    let address= $("#address").val();
    let city= $("#city").val();
    let state= $("#state").val();
    let office_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "address": address,
        "city": city,
        "state": state,
        "action": "register_office",
    }
  
    }else{
        sendingData = {
            "office_id": office_id,
            "address": address,
            "city": city,
            "state": state,
            "action": "update_office",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/office_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#officeform")[0].reset();
         $("officemodal").modal("hide");
         loadoffice();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadoffice(){
    $("#officetable tbody").html('');
    $("#officetable thead").html('');
   
    let sendingData ={
        "action": "read_office_table"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/office_api.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['office_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['office_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#officetable thead").append(th);
            $("#officetable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_office(office_id){
  
    let sendingData ={
      "action": "get_office",
      "office_id": office_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/office_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['office_id']);
    
                $("#address").val(response['address']);
                $("#city").val(response['city']);
                $("#state").val(response['state']);
                $("#officemodal").modal('show');
              
                
              
  
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
        $("#officemodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#officeform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_office(office_id){
  
    let sendingData ={
      "action": "Delete_office",
      "office_id": office_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/office_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadoffice();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#officetable").on('click', "button.update_info", function(){
    let office_id= $(this).attr("update_id");
    get_office(office_id);
    console.log(office_id)

  })
  
  $("#officetable").on('click', "button.delete_info", function(){
    let office_id= $(this).attr("delete_id");
    console.log(office_id);
    if(confirm("Are you sure To Delete")){
        Delete_office(office_id)
  
    }
   
  })