loadfranchise();
fillfranchise_type();

$("#addfranchise").on("click", function(){
    $("#franchisemodal").modal("show");
});



btnAction = "Insert";


$("#franchiseForm").on("submit", function(event){
    
    event.preventDefault();
  
  
    let name= $("#name").val();
    let address= $("#address").val();
    let city= $("#city").val();
    let country= $("#country").val();
    let franchise_type_id= $("#franchise_type_id").val();
    let franchisee_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "name": name,
        "address": address,
        "city": city,
        "country": country,
        "franchise_type_id": franchise_type_id,
        "action": "register_franchise",
    }
  
    }else{
        sendingData = {
            "franchisee_id": franchisee_id,
            "name": name,
            "address": address,
            "city": city,
            "country": country,
            "franchise_type_id": franchise_type_id,
            "action": "update_franchise",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchise.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#franchiseForm")[0].reset();
         $("franchisemodal").modal("hide");
         loadfranchise();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })
 
  function fillfranchise_type(){
 
    let sendingData ={
        "action": "read_franchise_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/franchise.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['franchise_type_id']}">${res['name']}</option>`;
                   
                })
  
                $("#franchise_type_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

 function loadfranchise(){
    $("#franchise_table tbody").html('');
    $("#franchise_table thead").html('');
   
    let sendingData ={
        "action": "read_franchise"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/franchise.php",
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

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['franchisee_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['franchisee_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                tr+= "</tr>"
              
            })

            $("#franchise_table thead").append(th);
            $("#franchise_table tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_franchise(franchisee_id){
  
    let sendingData ={
      "action": "get_franchise",
      "franchisee_id": franchisee_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchise.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['franchisee_id']);
               $("#name").val(response['name']);
               $("#address").val(response['address']);
               $("#city").val(response['city']);
               $("#country").val(response['country']);
               $("#franchise_type_id").val(response['franchise_type_id']);
             
               $("#franchisemodal").modal("show");
           
  
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


  function Delete_franchise(franchisee_id){
  
    let sendingData ={
      "action": "Delete_franchise",
      "franchisee_id": franchisee_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchise.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadfranchise();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#franchise_table").on('click', "button.update_info", function(){
    let franchisee_id= $(this).attr("update_id");
    get_franchise(franchisee_id);
    console.log(invoice_id)

  })
  
  $("#franchise_table").on('click', "button.delete_info", function(){
    let franchisee_id= $(this).attr("delete_id");
    console.log(franchisee_id);
    if(confirm("Are you sure To Delete")){
      Delete_franchise(franchisee_id)
  
    }
   
  })