loadpayment();
fillinvoice();
fillorder();
fillpaymentmethod();
fillpayment_method();
fillfranchisee();
fillaccount();
$("#addpayment").on("click", function(){
  $("#paymentform")[0].reset();
    $("#paymentmodal").modal("show");
});



btnAction = "Insert";
$("#paymentform").on("submit", function(event){
    
    event.preventDefault();

    let customer_id= $("#customer_id").val();
    let invoice_id= $("#invoice_id").val();
    let order_id= $("#order_id").val();
    let account_id= $("#account_id").val();
    let amount= $("#amount").val();
    let payment_method_id= $("#payment_method_id").val();
    let payment_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "customer_id": customer_id,
        "invoice_id": invoice_id,
        "order_id": order_id,
        "account_id": account_id,
        "amount": amount,
        "payment_method_id": payment_method_id,
        "action": "register_payment",
    }
  
    }else{
        sendingData = {
            "payment_id": payment_id,
            "customer_id": customer_id,
            "invoice_id": invoice_id,
            "order_id": order_id,
            "account_id": account_id,
            "amount": amount,
            "payment_method_id": payment_method_id,
            "action": "update_payment",
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
        dispalaymessage("success", response);

         btnAction="Insert";
         $("#paymentform")[0].reset();
         $("paymentmodal").modal("hide");
         loadpayment();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })
  function fillfranchisee(){
 
    let sendingData ={
        "action": "read_franchisee"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['franchisee_id']}">${res['franchisee']}</option>`;
                   
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

  function fillpaymentmethod(){
 
    let sendingData ={
        "action": "read_payment_method"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['payment_method_id']}">${res['method_name']}</option>`;
                   
                })
  
                $("#payment_method_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }


  function fillinvoice(){
 
    let sendingData ={
        "action": "readinvoice"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['invoice_id']}">${res['invoice_id']}</option>`;
                   
                })
  
                $("#invoice_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }
  function fillorder(){
 
    let sendingData ={
        "action": "readorder"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['order_id']}">${res['item_name']}</option>`;
                   
                })
  
                $("#order_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }
  function fillpayment_method(){
 
    let sendingData ={
        "action": "readpayment_method"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['payment_method_id']}">${res['Name']}</option>`;
                   
                })
  
                $("#payment_method_id").append(html);
  
               
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
        "action": "readaccount"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['account_id']}">${res['bank_name']}</option>`;
                   
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

 function loadpayment(){
    $("#paymnettable tbody").html('');
    $("#paymnettable thead").html('');
   
    let sendingData ={
        "action": "tableview"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/payment_api.php",
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
                if(res[r] == "process"){
                  tr += `<td><span class="badge bg-danger text-white">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge bg-success text-white">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['payment_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               `
                tr+= "</tr>"
              
            })

            $("#paymnettable thead").append(th);
            $("#paymnettable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_payment(payment_id){
  
    let sendingData ={
      "action": "get_payment",
      "payment_id": payment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['payment_id']);
               $("#customer_id").val(response['customer_id'] );
               $("#order_id").val(response['order_id']);
               $("#account_id").val(response['account_id']);
               $("#amount").val(response['amount']);
               $("#payment_method_id").val(response['payment_method_id']);
               $("#account_id").val(response['account_id']).readonly;
             
               $("#paymentmodal").modal("show");
           
  
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
        $("#paymentmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#paymentform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_payment(payment_id){
  
    let sendingData ={
      "action": "Delete_payment",
      "payment_id": payment_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadpayment();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

 

//$phoneNumber=252617490299;

//sendtext($phoneNumber);


  $("#paymnettable").on('click', "button.update_info", function(){
    let payment_id= $(this).attr("update_id");
    get_payment(payment_id);
    console.log(payment_id)

  })


  
  $("#paymnettable").on('click', "button.delete_info", function(){
    let payment_id= $(this).attr("delete_id");
    console.log(payment_id);
    if(confirm("Are you sure To Delete")){
      Delete_payment(payment_id)
  
    }
   
  })