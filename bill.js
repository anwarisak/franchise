$("#add_bills").on("click", function(){
    $("#bill_modal").modal("show");
});
fill_salary();
read_employee();
  
  load_bill();
  btnAction = "Insert";

  function read_employee() {
    let sendingData = {
      action: "read_all_employeeee",
    };
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "api/bill_api.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        let html = "";
        let tr = "";
  
        if (status) {
          response.forEach((res) => {
            html += `<option value="${res["employee_id"]}">${res["employee_name"]}</option>`;
          });
  
          $("#employee_idd").append(html);
        } else {
          displaymssage("error", response);
        }
      },
      error: function (data) {},
    });
  }
  
    function read_account() {
      let sendingData = {
        action: "readaccount",
      };
    
      $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "api/bill_api.php",
        data: sendingData,
    
        success: function (data) {
          let status = data.status;
          let response = data.data;
          let html = "";
          let tr = "";
    
          if (status) {
            response.forEach((res) => {
              html += `<option value="${res["account_id"]}">${res["bank_name"]}</option>`;
            });
    
            $("#account").append(html);
          } else {
            displaymssage("error", response);
          }
        },
        error: function (data) {},
      });
    }
  
  $("#billform").on("submit", function (e) {
      e.preventDefault();
  
  
      let employee_idd = $("#employee_idd").val();
      let amount = $("#amount").val();
      let user = $("#user").val();
  
      let bill_id = $("#update_id").val();
  
      let sendingData = {};
  
      if (btnAction == "Insert") {
          sendingData = {
              employee_idd: employee_idd,
              amount: amount,
              user: user,
              action: "register_bills"
          };
   
      }
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "api/bill_api.php",
          data: sendingData,
          success: function (data) {
              let status = data.status;
              let response = data.data;
  
              if(status){
                display_message("success", response);
                  btnAction="Insert";
                  load_bill();
                  $("#billform")[0].reset();
                 
                  
         
                 }else{
                    display_message("error", response);
                 }
                 
             },
             error: function(data){
                display_message("error", data.responseText);
         
             }
         
           })
  })



  $("#employee_idd").on("change", function () {
    let employee_idd = $(this).val();
    console.log("employee_idd", employee_idd);
    fill_salary(employee_idd);
    console.log('llll');
  
  })


  $("#employee_idd").on("change", function(){
    if($("#employee_idd").val()== 0){
      console.log("0 waaye");
      $("#amount").val("");
  
    }else{
      console.log(amount);
    }
  })
  
  
function fill_salary(employee_id) {
  let sendingData = {
    "action": "read_employe_salary",
    "employee_id": employee_id

  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/bill_api.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#amount").val(res['salary']);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}
  
  function load_bill() {
      $("#billTable tbody").html("");
     $("#billTable thead").html("");
  
      let sendingData = {
          action: "read_bills",
      };
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "api/bill_api.php",
          data: sendingData,
  
          success: function (data) {
              let status = data.status;
              let response = data.data;
              let html = "";
              let tr = "";
              let th = "";
  
              if (status) {
                  response.forEach(res => {
                      th = "<tr>";
                      for (let r in res) {
                          th += `<th>${r}</th>`;
                      }
  
                      th += "<td>Action</td></tr>";
  
  
  
  
                      tr += "<tr>";
                      for (let r in res) {
  
  
                          tr += `<td>${res[r]}</td>`;
  
  
                      }
  
                      tr += `<td> <a class="btn btn-info update_info"  update_id=${res['bill_id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_ID=${res['bill_id']}><i class="fas fa-trash"style="color: #fff"></i></a> </td>`
                      tr += "</tr>"
  
                  })
                 $("#billTable thead").append(th);
               $("#billTable tbody").append(tr);
              }
          },
          error: function (data) { },
      });
  }
  

  function display_message(type, message) {
      let success = document.querySelector(".alert-success");
      let error = document.querySelector(".alert-danger");
      if (type == "success") {
          error.classList = "alert alert-danger d-none";
          success.classList = "alert alert-success";
          success.innerHTML = message;
  
          setTimeout(function () {
              // $("#bookingmodal").modal("hide");
              success.classList = "alert alert-success d-none";
          }, 4000);
      } else {
          error.classList = "alert alert-danger";
          error.innerHTML = message;
      }
  }
  
 