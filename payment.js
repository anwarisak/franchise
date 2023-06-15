loadpayment();
fillinvoice();
fillorder();
fillpaymentmethod();
fillpayment_method();
fillfranchisee();
fill_total_price();
fill_account();
$("#addpayment").on("click", function(){
  $("#paymentform")[0].reset();
    $("#paymentmodal").modal("show");
});


btnAction = "Insert";
$("#paymentform").on("submit", function(event){
    
    event.preventDefault();

    let franchisee_id= $("#franchisee_id").val();
    let amount= $("#amount").val();
    let account_id= $("#account_id").val();
    let payment_method_id= $("#payment_method_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "franchisee_id": franchisee_id,
        "amount": amount,
        "account_id": account_id,
        "payment_method_id": payment_method_id,
        "action": "register_payment",
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
                  html+= `<option value="${res['franchisee_id']}">${res['franchise_name']}</option>`;
                   
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
  function fill_account(){
 
    let sendingData ={
        "action": "read_account"
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
                  html+= `<option value="${res['account_id']}">${res['bank']}</option>`;
                   
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


  $("#franchisee_id").on("change", function () {
    let franchisee_id = $(this).val();
    console.log("franchisee_id", franchisee_id);
    fill_total_price(franchisee_id);
  
  })


  $("#franchisee_id").on("change", function(){
    if($("#franchisee_id").val()== 0){
      console.log("0 waaye");
      $("#amount").val("");
  
    }else{
      console.log(amount);
    }
  })
  
  
function fill_total_price(franchisee_id) {
  let sendingData = {
    "action": "read_total_amount",
    "franchisee_id": franchisee_id

  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/payment_api.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#amount").val(res['total_amount']);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

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


 

