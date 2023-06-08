load_item_type();


$("#add_item_type").on("click", function(){
    $("#item_type_modal").modal("show");
});



btnAction = "Insert";


$("#item_type_form").on("submit", function(event){
    
    event.preventDefault();
  
  
    
    let name= $("#name").val();
    let item_type_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {
        "name": name,
        "action": "register_item_type",
    }
  
    }else{
        sendingData = {
            "item_type_id": item_type_id,
            "name": name,
            "action": "update_item_type",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item_type.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#item_type_form")[0].reset();
         $("item_type_modal").modal("hide");
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
 
 

 function load_item_type(){
    $("#item_type_table tbody").html('');
    $("#item_type_table thead").html('');
   
    let sendingData ={
        "action": "read_item_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/item_type.php",
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

               tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['item_type_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
               &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['item_type_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                tr+= "</tr>"
              
            })

            $("#item_type_table thead").append(th);
            $("#item_type_table tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_item_type(item_type_id){
  
    let sendingData ={
      "action": "get_item_type",
      "item_type_id": item_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item_type.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
  
               $("#update_id").val(response['item_type_id']);
               $("#name").val(response['name']);
             
               $("#item_type_modal").modal("show");
           
  
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


  function Delete_item_type(item_type_id){
  
    let sendingData ={
      "action": "Delete_item_type",
      "item_type_id": item_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/item_type.php",
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

  $("#item_type_table").on('click', "button.update_info", function(){
    let item_type_id= $(this).attr("update_id");
    get_item_type(item_type_id);
    console.log(invoice_id)

  })
  
  $("#item_type_table").on('click', "button.delete_info", function(){
    let item_type_id= $(this).attr("delete_id");
    console.log(item_type_id);
    if(confirm("Are you sure To Delete")){
        Delete_item_type(item_type_id)
  
    }
   
  })