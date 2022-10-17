// GET , POST, PUT y DELETE

function getReservaciones (){
    $.ajax({
       url:"http://129.159.37.204:8080/api/Reservation/all",
       type:"GET",
       datatype:"JSON",
       success:function(respuesta){
        //console.log(respuesta);
        pintarReservaciones(respuesta);
       } 
    });

}

function postReservaciones (){
    if($("#startDate").val().length==0 || ($("#devolutionDate").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        startDate 
      }else{
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient: +$("#select-cliente").val()},
        machine:{id: +$("#select-machine").val()}
    };
    //console.log(cajas)
    // usamos el post de categorias lo ajustamos a los atributos de machine
    // (name, brand, year, descriptiobn. tambien debemos adicionar
    // el atributo de id de la categoria seleccionaday formamos el array (cajas)
    // NOTA: recuerde que en al seleccion de categoria usted mostro las categorias,
    // no los id´s de las categorias. leugo debe asociar el id de la categoria
    // escogida, y ademas adicionarle los {} qye lleva la categoria 
    // dentro del JSON de machine
    
    //console.log(cajas);
    // en console log lo pusios para ver como se armo el array
    $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            alert("Se creo correctamente la reserva");
            window.location.reload();      
         
        } 
     });
    }
}



function putReservaciones (idDesdeBoton){
    if($("#startDate").val().length==0 || ($("#devolutionDate").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        startDate 
      }else{
    let cajas = {
        idReservation:idDesdeBoton,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),

        
    };
    //console.log(cajas)

    $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se Actualizo correctamente la Reservacion");
            window.location.reload();      
         
        } 
     });
    }

}

function deleteReservaciones (idDesdeBoton){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Reservation/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        // en las dos lineas siguientes armamos el JSON para usar
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(idDesdeBoton), 
        // armamos el JSON con lo creado en cajas.
        // la funcion JSON.stringify convierte un array en JSON
         
        success:function(respuesta){
            //console.log(idDesdeBoton)
            alert("Se Borro correctamente La Reservacion");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });

}

///////////////////////////////////
function pintarReservaciones(respuesta){

    let myTable="<table>";
        let ID = " ID";
        let STARTDATE = "STARTDATE";
        let DEVOLUTIONDATE = "DEVOLUTIONDATE";
        let STATUS = "STATUS";
        let CLIENTE = "CLIENTE";
        let MAQUINA = "MAQUINA";
        
        myTable+="<th>"+ID+"</th>";
        myTable+="<th>"+STARTDATE+"</th>";
        myTable+="<th>"+DEVOLUTIONDATE+"</th>";
        myTable+="<th>"+STATUS+"</th>";
        myTable+="<th>"+CLIENTE+"</th>";
        myTable+="<th>"+MAQUINA+"</th>";
      
    for (i=0;i<respuesta.length;i++){

        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].machine.description+"</td>";
        myTable+="<td> <button class='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='deleteReservaciones("+respuesta[i].idReservation+")'> Borrar</button>"
        myTable+="<td> <button class='text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='putReservaciones("+respuesta[i].idReservation+")'> Actualizar</button>"        
        myTable+="</tr>";
    }
    
    myTable+="</table>";
    $("#resultadoReservas").html(myTable);
}

///////////////////////////////////


//////////////////
function getClientes_Reservaciones(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-cliente");
            $.each(respuesta, function(id, name){

                $select.append('<option value='+name.idClient+'>'+name.name+'</option')
            })
        } 
     })
    }
    
//////////////////
function getMachine_Reservaciones(){
    $.ajax({
        url:"http://localhost:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){

                $select.append('<option value='+name.id+'>'+name.name+'</option')
            })
        } 
     });
    }

