// btn=document.querySelector("#btnsave");

// btn.addEventListener("click",function(){
//     console.log("hhh");
// })

btnAction = "Insert";


$("#branchform").on("submit", function(event){
    
  
  

    let number= $("#number").val();
    let name= $("#name").val();
    let bank_name= $("#bank_name").val();
    let balance= $("#balance").val();
    let account_id= $("#update_id").val();
  
    let sendingData = {}
  
    if(btnAction == "Insert"){
       sendingData = {

        "number": number,
        "name": name,
        "bank_name": bank_name,
        "balance": balance,
        "action": "register_account",
    }
  
    }else{
        sendingData = {
            "account_id": account_id,
            "number": number,
            "name": name,
            "bank_name": bank_name,
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
