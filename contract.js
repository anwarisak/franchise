loadcontract();
fillfranchise();
fillfranchise_type();

$("#contactbtn").on("click", function(){
    $("#contactmodal").modal("show");
});

btnAction = "Insert";


$("#contactform").on("submit", function(event){
    
    event.preventDefault();
  

    let franchisee_id= $("#franchisee_id").val();
    let franchise_type_id= $("#franchise_type_id").val();
    let franchiser= $("#franchiser").val();
    let comission_fee= $("#comission_fee").val();
    let contract_date= $("#contract_date").val();
    let contract_expire= $("#contract_expire").val();
   
    let contract_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "franchisee_id": franchisee_id,
        "franchise_type_id": franchise_type_id,
        "franchiser": franchiser,
        "comission_fee": comission_fee,
        "contract_date": contract_date,
        "contract_expire": contract_expire,
      
        "action": "register_contact",
    }
  
    }else{
        sendingData = {
            "contract_id": contract_id,
            "franchisee_id": franchisee_id,
            "franchise_type_id": franchise_type_id,
            "franchiser": franchiser,
            "comission_fee": comission_fee,
            "contract_date": contract_date,
            "contract_expire": contract_expire,
          
            "action": "update_contract",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/contract.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#contactform")[0].reset();
         $("contactmodal").modal("hide");
         loadcontract();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadcontract(){
    $("#contactable tbody").html('');
    $("#contactable thead").html('');
   
    let sendingData ={
        "action": "loadcontract"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/contract.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['contract_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['contract_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#contactable thead").append(th);
            $("#contactable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function fillfranchise(){
 
    let sendingData ={
        "action": "read_franchise"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/contract.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['franchisee_id']}">${res['name']}</option>`;
                   
                })
  
                $("#franchisee_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

  function fillfranchise_type(){
 
    let sendingData ={
        "action": "read_franchise_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/contract.php",
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

  

 

 

  function get_contract(contract_id){
  
    let sendingData ={
      "action": "get_contract",
      "contract_id": contract_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/contract.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['contract_id']);
              $("#franchisee_id").val(response['franchisee_id']);
              $("#franchise_type_id").val(response['franchise_type_id']);
              $("#franchiser").val(response['franchiser']);
              $("#comission_fee").val(response['comission_fee']);
              $("#contract_date").val(response['contract_date']);
              $("#contract_expire").val(response['contract_expire']);
              $("#contactmodal").modal('show');

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


  function Delete_contract(contract_id){
  
    let sendingData ={
      "action": "Delete_contract",
      "contract_id": contract_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/contract.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
            swal("Good job!", response, "success");
            loadcontract();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#contactable").on('click', "button.update_info", function(){
    let contract_id= $(this).attr("update_id");
    get_contract(contract_id);

  })
  
  $("#contactable").on('click', "button.delete_info", function(){
    let contract_id= $(this).attr("delete_id");
    console.log(contract_id);
    if(confirm("Are you sure To Delete")){
      Delete_contract(contract_id)
  
    }
   
  })