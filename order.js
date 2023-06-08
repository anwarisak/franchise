loadoerder();
loadfranchisee();
fillitem();
$("#addorder").on("click", function(){

    $("#ordermodal").modal("show");
});

btnAction = "Insert";


$("#orderform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let franchisee_id= $("#franchisee_id").val();
    let item_id= $("#item_id").val();
    let quantity= $("#quantity").val();
    let amount= $("#amount").val();
    let orders_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "franchisee_id": franchisee_id,
        "item_id": item_id,
        "quantity": quantity,
        "amount": amount,
        "action": "register_order",
    }
  
    }else{
        sendingData = {
            "orders_id": orders_id,
            "franchisee_id": franchisee_id,
            "item_id": item_id,
            "quantity": quantity,
            "amount": amount,
            "action": "update_order",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/order_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";

         $("#orderform")[0].reset();

         $("ordermodal").modal("hide");
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

  function loadfranchisee(){
 
    let sendingData ={
        "action": "read_franchisee"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/order_api.php",
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

  function fillitem(){
 
    let sendingData ={
        "action": "read_item"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/order_api.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['item_id']}">${res['name']}</option>`;
                   
                })
  
                $("#item_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }




 function loadoerder(){
    $("#ordertable tbody").html('');
    $("#ordertable thead").html('');
   
    let sendingData ={
        "action": "read_orders"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/order_api.php",
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
                th += "<td>Action</td></tr>";

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['orders_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['orders_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#ordertable thead").append(th);
            $("#ordertable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_order(orders_id){
  
    let sendingData ={
      "action": "get_order",
      "orders_id": orders_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/order_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['orders_id']);
               $("#franchisee_id").val(response['franchisee_id']);
               $("#item_id").val(response['item_id']);
               $("#quantity").val(response['quantity']);
               $("#amount").val(response['amount']);
               $("#ordermodal").modal("show");
           
  
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
        $("#ordermodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#orderform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_order(orders_id){
  
    let sendingData ={
      "action": "delete_order",
      "orders_id": orders_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/order_api.php",
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

  $("#ordertable").on('click', "button.update_info", function(){
    let orders_id= $(this).attr("update_id");
    get_order(orders_id);
    console.log(orders_id)

  })
  
  $("#ordertable").on('click', "button.delete_info", function(){
    let orders_id= $(this).attr("delete_id");
    if(confirm("Are you sure To Delete")){
      Delete_order(orders_id)
  
    }
   
  })