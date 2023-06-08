loadoerder();
fillmonth();
fillaccount();
$("#addcharge").on("click", function(){

    $("#chargemodal").modal("show");
});

btnAction = "Insert";


$("#chargeform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let month_id= $("#month_id").val();
    let year= $("#year").val();
    let description= $("#description").val();
    let users_id= $("#users_id").val();
    let account_id= $("#account_id").val();
    let charge_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "month_id": month_id,
        "year": year,
        "description": description,
        "users_id": users_id,
        "account_id": account_id,
        "action": "register_charge",
    }
  
    }else{
        sendingData = {
            "charge_id": charge_id,
            "month_id": month_id,
            "year": year,
            "description": description,
            "users_id": users_id,
            "account_id": account_id,
            "action": "update_charge",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/charge_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";

         $("#chargeform")[0].reset();

         $("chargemodal").modal("hide");
         loadoerder();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })

  function fillmonth(){
 
    let sendingData ={
        "action": "read_month"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/charge_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['month_id']}">${res['name']}</option>`;
                   
                })
  
                $("#month_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function fillaccount(){
 
    let sendingData ={
        "action": "read_account"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/charge_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['account_id']}">${res['name']}</option>`;
                   
                })
  
                $("#account_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }




 function loadoerder(){
    $("#chargetable tbody").html('');
    $("#chargetable thead").html('');
   
    let sendingData ={
        "action": "read_charges"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/charge_api.php",
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
                    if(res[r] == "pending"){
                      tr += `<td><span class="badge bg-danger text-white">${res[r]}</span></td>`;
                    }else{
                      tr += `<td><span class="badge bg-success text-white">${res[r]}</span></td>`;
                    }
               
               }else{
                tr += `<td>${res[r]}</td>`;
               }
                }
             
              
            })

            $("#chargetable thead").append(th);
            $("#chargetable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_charge(charge_id){
  
    let sendingData ={
      "action": "get_charge",
      "charge_id": charge_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/charge_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['charge_id']);
               $("#month_id").val(response['month_id']);
               $("#account_id").val(response['account_id']);
               $("#quantity").val(response['quantity']);
               $("#chargemodal").modal("show");
           
  
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
        $("#chargemodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#chargeform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_charge(charge_id){
  
    let sendingData ={
      "action": "delete_charge",
      "charge_id": charge_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/charge_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadoerder();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#chargetable").on('click', "button.update_info", function(){
    let charge_id= $(this).attr("update_id");
    get_charge(charge_id);
    console.log(charge_id)

  })
  
  $("#chargetable").on('click', "button.delete_info", function(){
    let charge_id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
      Delete_charge(charge_id)
  
    }
   
  })