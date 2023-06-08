loadpayment_method();

$("#payment_methodbutton").on("click", function(){
    $("#payment_methodmodal").modal("show");
});

btnAction = "Insert";


$("#payment_methodForm").on("submit", function(event){
    
    event.preventDefault();
  

    let method_name= $("#method_name").val();
   
    let payment_method_id= $("#payment_method_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "method_name": method_name,
      
        "action": "register_payment_method",
    }
  
    }else{
        sendingData = {
            "payment_method_id": payment_method_id,
            "method_name": method_name,
          
            "action": "update_payment_method",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_method_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#payment_methodForm")[0].reset();
         $("payment_methodmodal").modal("hide");
         loadpayment_method();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadpayment_method(){
    $("#payment_methodtable tbody").html('');
    $("#payment_methodtable thead").html('');
   
    let sendingData ={
        "action": "read_payment_method"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_method_api.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['payment_method_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['payment_method_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#payment_methodtable thead").append(th);
            $("#payment_methodtable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_payment_method(payment_method_id){
  
    let sendingData ={
      "action": "get_payment_method",
      "payment_method_id": payment_method_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_method_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['payment_method_id']);
              $("#method_name").val(response['method_name']);
              $("#payment_methodmodal").modal('show');

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


  function Delete_payment_method(payment_method_id){
  
    let sendingData ={
      "action": "Delete_payment_method",
      "payment_method_id": payment_method_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_method_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
         
          if(status){
  
            swal("Good job!", response, "success");
            loadpayment_method();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#payment_methodtable").on('click', "button.update_info", function(){
    let payment_method_id= $(this).attr("update_id");
    get_payment_method(payment_method_id);

  })
  
  $("#payment_methodtable").on('click', "button.delete_info", function(){
    let payment_method_id= $(this).attr("delete_id");
    console.log(payment_method_id);
    if(confirm("Are you sure To Delete")){
      Delete_payment_method(payment_method_id)
  
    }
   
  })