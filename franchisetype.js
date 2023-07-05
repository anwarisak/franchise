loadfranchise_type();

$("#franchisetypebtn").on("click", function(){
    $("#franchisetypemodal").modal("show");
});

btnAction = "Insert";


$("#franchisetypeform").on("submit", function(event){
    
    event.preventDefault();
  

    let fname= $("#fname").val();
    
   
    let franchise_type_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "fname": fname,
        
      
        "action": "register_franchise_type",
    }
  
    }else{
        sendingData = {
            "franchise_type_id": franchise_type_id,
            "fname": fname,
            
          
            "action": "update_franchise_type",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchisetype.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#franchisetypeform")[0].reset();
         $("franchisetypemodal").modal("hide");
         loadfranchise_type();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadfranchise_type(){
    $("#franchisetypetable tbody").html('');
    $("#franchisetypetable thead").html('');
   
    let sendingData ={
        "action": "read_franchise_type"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/franchisetype.php",
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

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['franchise_type_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['franchise_type_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#franchisetypetable thead").append(th);
            $("#franchisetypetable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_franchise_type(franchise_type_id){
  
    let sendingData ={
      "action": "get_franchise_type",
      "franchise_type_id": franchise_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchisetype.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['franchise_type_id']);
              $("#fname").val(response['name']);
              
              $("#franchisetypemodal").modal('show');

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


  function Delete_franchise_type(franchise_type_id){
  
    let sendingData ={
      "action": "Delete_franchise_type",
      "franchise_type_id": franchise_type_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/franchisetype.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
          if(status){
  
            swal("Good job!", response, "success");
            loadfranchise_type();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#franchisetypetable").on('click', "button.update_info", function(){
    let franchise_type_id= $(this).attr("update_id");
    get_franchise_type(franchise_type_id);

  })
  
  $("#franchisetypetable").on('click', "button.delete_info", function(){
    let franchise_type_id= $(this).attr("delete_id");
    console.log(franchise_type_id);
    if(confirm("Are you sure To Delete")){
      Delete_franchise_type(franchise_type_id)
  
    }
   
  })