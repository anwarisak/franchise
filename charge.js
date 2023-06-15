load_charges();
fillmonth();
fillaccount();
$("#addcharge").on("click", function(){

    $("#chargemodal").modal("show");
});

btnAction = "Insert";


$("#chargeform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let month_idd= $("#month_idd").val();
    let year= $("#year").val();
    let description= $("#description").val();
    let user_id= $("#user_id").val();
    let Acount_id= $("#Acount_id").val();
    let charge_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "month_idd": month_idd,
        "year": year,
        "description": description,
        "user_id": user_id,
        "Acount_id": Acount_id,
        "action": "register_charge",
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
         display_message("success", response);
         btnAction="Insert";

         $("#chargeform")[0].reset();

         $("chargemodal").modal("hide");
         loadcharge();
  
        }else{
          display_message("error", response);
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
                  html+= `<option value="${res['month_id']}">${res['month_name']}</option>`;
                   
                })
  
                $("#month_idd").append(html);
  
               
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
                  html+= `<option value="${res['account_id']}">${res['bank']}</option>`;
                   
                })
  
                $("#Acount_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

 function load_charges(){
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

  function display_message(type, message){
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

