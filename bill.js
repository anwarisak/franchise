$("#billbutton").on("click", function(){
    $("#billmodal").modal("show");
    console.log("office");
  });
  
  reademployee();
  read_account();
  
  loadbill();
  read_p_method();
  btnAction = "Insert";
  
  
  function reademployee() {
    let sendingData = {
      action: "reademployee",
    };
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/bill_api.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        let html = "";
        let tr = "";
  
        if (status) {
          response.forEach((res) => {
            html += `<option value="${res["employee_id"]}">${res["fristname"]}</option>`;
          });
  
          $("#employee").append(html);
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
        url: "Api/bill_api.php",
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
  
  $("#billForm").on("submit", function (e) {
      e.preventDefault();
  
  
      let employee = $("#employee").val();
      let account = $("#account").val();
      let amount = $("#amount").val();
  
      let bill_id = $("#update_id").val();
  
      let sendingData = {};
  
      if (btnAction == "Insert") {
          sendingData = {
              employee: employee,
              account: account,
              amount: amount,
              
              
          
              action: "register_bill"
          };
      } else {
          sendingData = {
              bill_id: id,
              employee: employee,
              account: account,
              amount: amount,
             
              
              
              action: "update_bill",
          };
      }
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "Api/bill_api.php",
          data: sendingData,
          success: function (data) {
              let status = data.status;
              let response = data.data;
  
              if(status){
                  dispplaymessage("success", response);
                  btnAction="Insert";
                  loadbill();
                  $("#billtForm")[0].reset();
                  $("billmodal").modal("hide");
                  loadbill();
                 
                  
         
                 }else{
                  dispplaymessage("error", response);
                 }
                 
             },
             error: function(data){
              dispplaymessage("error", data.responseText);
         
             }
         
           })
  })
  
  function loadbill() {
      $("#billTable tbody").html("");
     $("#billTable thead").html("");
  
      let sendingData = {
          action: "read_bill",
      };
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "Api/bill_api.php",
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
  
  
  function get_employe(bill_id) {
      let sendingData = {
          action: "get_employe",
          bill_id: bill_id,
      };
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "Api/employee_api.php",
          data: sendingData,
  
          success: function (data) {
              let status = data.status;
              let response = data.data;
  
              if (status) {
                  btnAction = "update";
  
                  $("#update_id").val(response["bill_id"]);
                  $("#employee").val(response["fristname"]);
                  $("#amount").val(response["lastname"]);
                  $("#account").val(response["account"]);
                  $("#account").val(response["account"]);
                  $("#payment").val(response["bill_id"]);
                  $("#employemodal").modal("show");
                  loadaccount();
              } else {
                  dispplaymessage("error", response);
              }
          },
          error: function (data) { },
      });
  }
  
  function dispplaymessage(type, message) {
      let success = document.querySelector(".alert-success");
      let error = document.querySelector(".alert-danger");
      if (type == "success") {
          error.classList = "alert alert-danger d-none";
          success.classList = "alert alert-success";
          success.innerHTML = message;
  
          setTimeout(function () {
              // $("#bookingmodal").modal("hide");
              success.classList = "alert alert-success d-none";
          }, 2000);
      } else {
          error.classList = "alert alert-danger";
          error.innerHTML = message;
      }
  }
  
  function Delete_employe(bill_id) {
      let sendingData = {
          action: "Delete_employe",
          bill_id: bill_id,
      };
  
      $.ajax({
          method: "POST",
          dataType: "JSON",
          url: "Api/employee_api.php",
          data: sendingData,
  
          success: function (data) {
              let status = data.status;
              let response = data.data;
  
              if (status) {
                  swal("Good job!", response, "success");
              } else {
                  swal(response);
              }
          },
          error: function (data) { },
      });
  }
  
  $("#paymentTable").on("click", "a.update_info", function () {
      let id = $(this).attr("update_id");
      get_employe(id);
  });
  
  $("#paymentTable").on("click", "a.delete_info", function () {
      let id = $(this).attr("delete_id");
      if (confirm("Are you sure To Delete")) {
          Delete_employe(id);
      }
  });
  