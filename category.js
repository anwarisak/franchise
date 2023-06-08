loadcategory();

$("#categorybutton").on("click", function(){
    $("#categorymodal").modal("show");
});

btnAction = "Insert";


$("#categoryform").on("submit", function(event){
    
    event.preventDefault();
  

    let category_name= $("#category_name").val();
   
    let category_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "category_name": category_name,
      
        "action": "register_category",
    }
  
    }else{
        sendingData = {
            "category_id": category_id,
            "category_name": category_name,
          
            "action": "update_category",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/category_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#categoryform")[0].reset();
         $("categorymodal").modal("hide");
         loadcategory();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadcategory(){
    $("#categorytable tbody").html('');
    $("#categorytable thead").html('');
   
    let sendingData ={
        "action": "readcategory"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/category_api.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['category_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['category_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#categorytable thead").append(th);
            $("#categorytable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function getcategory(category_id){
  
    let sendingData ={
      "action": "getcategory",
      "category_id": category_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/category_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['category_id']);
              $("#category_name").val(response['name']);
              $("#categorymodal").modal('show');

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


  function Delete_category(category_id){
  
    let sendingData ={
      "action": "Delete_category",
      "category_id": category_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/category_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
            swal("Good job!", response, "success");
            loadcategory();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#categorytable").on('click', "button.update_info", function(){
    let category_id= $(this).attr("update_id");
    getcategory(category_id);

  })
  
  $("#categorytable").on('click', "button.delete_info", function(){
    let category_id= $(this).attr("delete_id");
    console.log(category_id);
    if(confirm("Are you sure To Delete")){
      Delete_category(category_id)
  
    }
   
  })