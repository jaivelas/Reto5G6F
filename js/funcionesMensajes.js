// GET , POST, PUT y DELETE

function getMensajes (){
    $.ajax({
       url:"http://129.159.37.204:8080/api/Message/all",
       type:"GET",
       datatype:"JSON",
       success:function(respuesta){
        //console.log(respuesta);
        pintarMensajes(respuesta);
       } 
    });

}

function postMensajes(){
    if($("#messageText").val().length==0){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        description 
      }else{ // Si ninguno est avacio, este corchete debe incluir todo el llamado ajaX
        //console.log(respuesta);
    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-cliente").val()},
        machine:{id: +$("#select-machine").val()}
    };
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
        url:"http://129.159.37.204:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            alert("Se creo correctamente el mensaje");
            window.location.reload();      
         
        } 
     });
    }
}

function putMensajes (idDesdeBoton){
    if($("#messageText").val().length==0){
        // SI tamaño de messageText  es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        messageText 
      }else{

    let cajas = {
        idMessage:idDesdeBoton,
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-cliente").val()},
        machine:{id: +$("#select-machine").val()}
       
        };
    //console.log(cajas)

    $.ajax({
        url:"http://129.159.37.204:8080/api/Message/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            alert("Se Actualizo correctamente El Mensaje");
            window.location.reload();      
         
        } 
     });
    }


}


function deleteMensajes (idDesdeBoton){
    //console.log(idDesdeBoton);
    $.ajax({
        url:"http://129.159.37.204:8080/api/Message/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        // en las dos lineas siguientes armamos el JSON para usar
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(idDesdeBoton), 
        // armamos el JSON con lo creado en cajas.
        // la funcion JSON.stringify convierte un array en JSON
         
        success:function(respuesta){
            //console.log(idDesdeBoton)
            alert("Se Borro correctamente el Mensaje");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });

}

///////////////////////////////////
function pintarMensajes(respuesta){
    
    let myTable="<table>";
    //console.log(respuesta)
        let ID = "ID";
        let MENSAJE = "MENSAJE";
        let CLIENTE = "CLIENTE";
        let MAQUINA = "MAQUINA";
                
        myTable+="<th>"+ID+"</th>";
        myTable+="<th>"+MENSAJE+"</th>";
        myTable+="<th>"+MAQUINA+"</th>";
        myTable+="<th>"+CLIENTE+"</th>";
        
           
    for (i=0;i<respuesta.length;i++){
     
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].machine.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button class='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='deleteMensajes("+respuesta[i].idMessage+")'> Borrar</button>"
        myTable+="<td> <button class='text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='putMensajes("+respuesta[i].idMessage+")'> Actualizar</button>"

        myTable+="</tr>";
    }
    
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}

/////////////////////////////////
function getClientes_Mensajes(){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-cliente");
            $.each(respuesta, function(id, name){

                //console.log(name)
                //console.log(name.idClient)
                //console.log(name.name)

                $select.append('<option value='+name.idClient+'>'+name.name+'</option>')
            })
        } 
     });
}
/////////////////////////////////
function getMachine_Mensajes(){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Machine/all",
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

     //esta ajax es el mismo que use en categoria para llenar la tabla de 
     // categorias en la ventana de maquinas. solo debemso varias las acciones 
     // cuando se hace la alectura (success).

}