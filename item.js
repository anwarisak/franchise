loaditem();
fill_item_type();

$("#additem").on("click", function(){
    $("#itemmodal").modal("show");
});



btnAction = "Insert";


$("#itemform").on("submit", function(event){
    
    event.preventDefault();
  
  
    let item_type_id= $("#item_type_id").val();
    let name= $("#name").val();
    let quantity= $("#quantity").val();
    let item_cost= $("#item_cost").val();
    let price= $("#price").val();
    let added_date= $("#added_date").val();
    let item_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "item_type_id": item_type_id,
        "name": name,
        "quantity": quantity,
        "item_cost": item_cost,
        "price": price,
        "added_date": added_date,
        "action": "register_item",
    }
  
    }else{
        sendingData = {
            "item_id": item_id,
            "item_type_id": item_type_id,
            "name": name,
            "quantity": quantity,
            "item_cost": item_cost,
            "price": price,
            "added_date": added_date,
            "action": "update_item",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#itemform")[0].reset();
         $("itemmodal").modal("hide");
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
 
  function fill_item_type(){
 
    let sendingData ={
        "action": "read_item_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/item.php",
      data : sendingData,
  
        success : function(data){
            let status= data.status;
            let response= data.data;
            let html='';
            let tr= '';
  
            if(status){
                response.forEach(res=>{
                  html+= `<option value="${res['item_type_id']}">${res['name']}</option>`;
                   
                })
  
                $("#item_type_id").append(html);
  
               
            }else{
              displaymessage("error", response);
            }
  
        },
        error: function(data){
  
        }
  
    })
  }

 function loaditem(){
    $("#itemtable tbody").html('');
    $("#itemtable thead").html('');
   
    let sendingData ={
        "action": "read_item"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/item.php",
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

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['item_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['item_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                tr+= "</tr>"
              
            })

            $("#itemtable thead").append(th);
            $("#itemtable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_item(item_id){
  
    let sendingData ={
      "action": "get_item",
      "item_id": item_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['item_id']);
               $("#item_type_id").val(response['item_type_id']);
               $("#name").val(response['name']);
               $("#quantity").val(response['quantity']);
               $("#item_cost").val(response['item_cost']);
               $("#price").val(response['price']);
               $("#added_date").val(response['added_date']);
             
               $("#itemmodal").modal("show");
           
  
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


  function Delete_item(item_id){
  
    let sendingData ={
      "action": "Delete_item",
      "item_id": item_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item.php",
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

  $("#itemtable").on('click', "button.update_info", function(){
    let item_id= $(this).attr("update_id");
    get_item(item_id);
    console.log(invoice_id)

  })
  
  $("#itemtable").on('click', "button.delete_info", function(){
    let item_id= $(this).attr("delete_id");
    console.log(item_id);
    if(confirm("Are you sure To Delete")){
        Delete_item(item_id)
  
    }
   
  })