
function traerReporteStatus(){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
         pintarStatus(respuesta);
        }
    });

}

function traerReporteClientes(){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
         //console.log("va a pintar reporte clientes");
         //console.log(respuesta);
         pintarClientes(respuesta);
        }
    });
    
}

function traerReporteFechas(){
    //console.log("#dateOne.value()")
    if($("#dateOne").val().length==0 || ($("#dateTwo").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        startDate 
      }else{

    var fechaInicio = document.getElementById("dateOne").value;
    var fechaCierre = document.getElementById("dateTwo").value;
    

     $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        //console.log(respuesta);
        pintarFechas(respuesta);
        }
    });
}
}



////////////////////////////////////////
function pintarStatus(json_Reporte_Status){

    let myTable="<table>";
        let CONFIRMED = "CONFIRMADOS";
        let CANCELLED = "CANCELADOS";
                
        myTable+="<th>"+CONFIRMED+"</th>";
        myTable+="<th>"+CANCELLED+"</th>";
        
        myTable+="<tr>";
        myTable+="<td>"+json_Reporte_Status.completed+"</td>";
        myTable+="<td>"+json_Reporte_Status.cancelled+"</td>";
    myTable+="</tr>";
    

    myTable+="</table>";
    //console.log("va a pintar reporte-status");
    $("#informeStatus").html(myTable);
}

////////////////////////////////////////
function pintarClientes(json_Reporte_Clientes){
    //console.log(json_Reporte_Clientes);
    let myTable="<table>";
        let CLIENTE = "CLIENTE";
        let RESERVAS = "RESERVASS";
                
        myTable+="<th>"+CLIENTE+"</th>";
        myTable+="<th>"+RESERVAS+"</th>";
       
        for (i=0;i<json_Reporte_Clientes.length;i++){
     
            myTable+="<tr>";
            myTable+="<td>"+json_Reporte_Clientes[i].client.name+"</td>";
            myTable+="<td>"+json_Reporte_Clientes[i].total+"</td>";
            //console.log(json_Reporte_Clientes[i].client.name);
            //console.log(json_Reporte_Clientes[i].total);
            myTable+="</tr>";
        }
    
    myTable+="</table>";
    //console.log("va a pintar reporte-Clientes");
    $("#informeClientesA").html(myTable);
}
////////////////////////////////////////
function pintarFechas(json_Reporte_Fechas){
    //console.log(json_Reporte_Fechas)
    let myTable="<table>";
        //console.log(json_Reporte_Fechas)
        let ID = "ID"
        let STARTDATE = "FECHA INCIO";
        let DEVOLUTIONDATE = "FECHA DEVOLUCION";
        let CLIENT ="CLIENTE";
        let MACHINE = "MAQUINA";
                
        myTable+="<th>"+ID+"</th>";
        myTable+="<th>"+STARTDATE+"</th>";
        myTable+="<th>"+DEVOLUTIONDATE+"</th>";
        myTable+="<th>"+CLIENT+"</th>";
        myTable+="<th>"+MACHINE+"</th>";

        for (i=0;i<json_Reporte_Fechas.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_Reporte_Fechas[i].idReservation+"</td>";
        
        myTable+="<td>"+json_Reporte_Fechas[i].startDate+"</td>";
        myTable+="<td>"+json_Reporte_Fechas[i].devolutionDate+"</td>";
        myTable+="<td>"+json_Reporte_Fechas[i].client.name+"</td>";
        myTable+="<td>"+json_Reporte_Fechas[i].machine.name+"</td>";
        myTable+="</tr>";
        }
    

    myTable+="</table>";
    //console.log("va a pintar reporte-fechas");
    $("#informeFechas").html(myTable);
}

////////////////////////////////////////




/*
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://168.138.247.22:80/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
*/
