$("#franc_name").attr("disabled", true);

$("#type").on("change", function(){
    if($("#type").val()== 0){
    $("#franc_name").attr("disabled", true);

    }else{
        $("#franc_name").attr("disabled", false);
    }
})

$("#print_statement").on("click", function(){
    printStatement();
})

function printStatement(){
    let printarea= document.querySelector("#print_Area");

    let newwindow= window.open("");
    newwindow.document.write(`<html><head><title></title>`);
    newwindow.document.write(`<style media="print">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
    body{
        font-family: 'Poppins', sans-serif;
    }

    table{
        width:100%;
        
    }

    th{
        background-color: #04A336D !important;
        color: white !important;
       
    }
      
    th , td{
        padding:15px !important;
        text-align: left !important;

    }

    th , td{
        border-bottom : 1px solid #ddd !important;
    }
    
    
    </style>`);
    newwindow.document.write(`</head><body>`);
    newwindow.document.write(printarea.innerHTML);
    newwindow.document.write(`</body></html>`);
    newwindow.print();
    newwindow.close();
}


$("#export_statement").on("click", function(){
    let file= new Blob([$('#print_Area').html()], {type:"application/vnd.ms-excel"});
    let url= URL.createObjectURL(file);
    let a= $("<a />", {
        href: url,
        download: "print_statement.xls"}).appendTo("body").get(0).click();
        e.preventDefault();

});

btnAction = "Insert";

$("#pay_repoform").on("submit", function(event){
    
    event.preventDefault();
    $("#pay_repotable tr").html("");


    let franc_name= $("#franc_name").val();
    //let to= $("#to").val();
    let sendingData = {

        "franc_name": franc_name,

        "action": "get_pay",
    }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/pay_repo.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
   
        let tr= '';
        let th= '';

        if(status){
            response.forEach(res=>{

                th = "<tr>";
                for(let r in res){
                th += `<th>${r}</th>`;
               }

               th += "</tr>";


                tr += "<tr>";
                for(let r in res){
                tr += `<td>${res[r]}</td>`;
               }

               tr += "</tr>";
            })

            $("#pay_repotable thead").append(th);
            $("#pay_repotable tbody").append(tr);
        }
         
    },
    error: function(data){

    }

  })

})

function displaymessage(type, message){
  let success =   document.querySelector(".alert-success");
  let error =   document.querySelector(".alert-danger");
  if(type== "success"){
    error.classList= "alert alert-danger d-none";
     success.classList= "alert alert-success";
     success.innerHTML= message;

     setTimeout(function(){
      $("#expensemodal").modal("hide");
      success.classList= "alert alert-success d-none";
      $("#expenseForm")[0].reset();

     },3000);
  }else{
    error.classList= "alert alert-danger";
    error.innerHTML= message;
  }
}


function loadData(){
  $("#expenseTable tbody").html('');
 
  let sendingData ={
      "action": "get_user_transaction"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/expensi.php",
    data : sendingData,

      success : function(data){
          let status= data.status;
          let response= data.data;
          let html='';
          let tr= '';

          if(status){
              response.forEach(res=>{
                  tr += "<tr>";
                  for(let r in res){

                 if(r == "type"){
                  if(res[r] == "Income"){
                    tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
                  }else{
                    tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
                  }
                 }else{
                  tr += `<td>${res[r]}</td>`;
                 }

                  }

                  tr += `<td> <a class="btn btn-info update_info"  update_id=${res['id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                  tr+= "</tr>"
                
              })

              $("#expenseTable tbody").append(tr);
          }

      },
      error: function(data){

      }

  })
}



