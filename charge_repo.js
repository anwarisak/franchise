

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

$("#charge_repo_form").on("submit", function(event){
    
    event.preventDefault();
    $("#charge_repo_table tr").html("");


    let month_name= $("#month_name").val();
    //let to= $("#to").val();
    let sendingData = {

        "month_name": month_name,

        "action": "get_charge_repo",
    }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "api/charge_repo.php",
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

            $("#charge_repo_table thead").append(th);
            $("#charge_repo_table tbody").append(tr);
        }
         
    },
    error: function(data){

    }

  })

})








