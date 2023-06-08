loadaccount();



$("#addaccount").on("click", function(){
    $("#accountmodal").modal("show");
    console.log("office");
});




$("#send").on("click", function(){
    console.log("clicked");
});

btnAction = "Insert";


$("#accountform").on("submit", function(event){
    
    event.preventDefault();
  

    let number= $("#number").val();
    let bank= $("#bank").val();
    let holder_name= $("#holder_name").val();
    let balance= $("#balance").val();
    let account_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "number": number,
        "bank": bank,
        "holder_name": holder_name,
        "balance": balance,
        "action": "register_account",
    }
  
    }else{
        sendingData = {
            "account_id": account_id,
            "number": number,
            "bank": bank,
            "holder_name": holder_name,
            "balance": balance,
            "action": "update_account",
            
     
     }
  
  }
  
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/account_api.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
  
        if(status){
         dispalaymessage("success", response);
         btnAction="Insert";
         $("#accountform")[0].reset();
         $("accountmodal").modal("hide");
         loadoffice();
  
        }else{
            dispalaymessage("error", response);
        }
        
    },
    error: function(data){
        dispalaymessage("error", data.responseText);
  
    }
  
  })
  
  })


 function loadaccount(){
    $("#accounttable tbody").html('');
    $("#accounttable thead").html('');
   
    let sendingData ={
        "action": "viewaccount_table"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/account_api.php",
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
                if(res[r] == "office"){
                  tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                }else{
                  tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                }
               }else{
                tr += `<td>${res[r]}</td>`;
               }

                }
                th += "<td>Action</td></tr>";

                tr += `<td> <button class="btn btn-info update_info btn-primary btn-sm"  update_id=${res['account_id']}><i class="fas fa-edit" style="color: #fff" ></i></button>
                &nbsp;&nbsp <button class="btn btn-danger delete_info btn-secondary btn-sm" delete_id=${res['account_id']}><i class="fas fa-trash"style="color: #fff"></i></button> </td>`
                 tr+= "</tr>"
              
            })

            $("#accounttable thead").append(th);
            $("#accounttable tbody").append(tr);
        }

            
        },
        error: function(data){
  
        }
  
    })
  }

  function get_account(account_id){
  
    let sendingData ={
      "action": "get_account",
      "account_id": account_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/account_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
               btnAction= "update";
               
                $("#update_id").val(response['account_id']);
    
                $("#number").val(response['number']);
                $("#bank").val(response['bank']);
                $("#holder_name").val(response['holder_name']);
                $("#balance").val(response['balance']);
                $("#accountmodal").modal('show');
              
                
              
  
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
        $("#accountmodal").modal("hide");
        success.classList= "alert alert-success d-none";
        $("#accountform")[0].reset();
  
       },2000);
    }else{
      error.classList= "alert alert-danger";
      error.innerHTML= message;
    }
  }


  function Delete_account(account_id){
  
    let sendingData ={
      "action": "Delete_account",
      "account_id": account_id
  }
  
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/account_api.php",
    data : sendingData,
  
      success : function(data){
          let status= data.status;
          let response= data.data;
        
  
          if(status){
  
            swal("Good job!", response, "success");
            loadaccount();
  
          }else{
            swal(response);
          }
  
      },
      error: function(data){
  
      }
  
  })
  }

  $("#accounttable").on('click', "button.update_info", function(){
    let account_id= $(this).attr("update_id");
    get_account(account_id);
    console.log(account_id)

  })
  
  $("#accounttable").on('click', "button.delete_info", function(){
    let account_id= $(this).attr("delete_id");
    console.log(account_id);
    if(confirm("Are you sure To Delete")){
        Delete_account(account_id)
  
    }
   
  })