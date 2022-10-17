// GET , POST, PUT y DELETE

function getMachine (){
    $.ajax({
       url:"http://129.159.37.204:8080/api/Machine/all",
       type:"GET",
       datatype:"JSON",
       success:function(respuesta){
        //console.log(respuesta);
        pintarMachine(respuesta);
       } 
    });

}

function postMachine (){
    if($("#name").val().length==0 || ($("#description").val().length==0)|| ($("#year").val().length==0)|| ($("#brand").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        description 
      }else{
    let cajas = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
    };
    // usamos el post de categorias lo ajustamos a los atributos de machine
    // (name, brand, year, descriptiobn. tambien debemos adicionar
    // el atributo de id de la categoria seleccionaday formamos el array (cajas)
    // NOTA: recuerde que en al seleccion de categoria usted mostro las categorias,
    // no los id´s de las categorias. leugo debe asociar el id de la categoria
    // escogida, y ademas adicionarle los {} qye lleva la categoria 
    // dentro del JSON de machine
    
    //console.log(cajas);
    // eñ cpnsole log lo pusios para ver como ase armo el array
    $.ajax({
        url:"http://129.159.37.204:8080/api/Machine/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se creo correctamente la maquina");
            window.location.reload();      
         
        } 
     });
    }
}

function putMachine (idDesdeBoton){
    if($("#name").val().length==0 || ($("#description").val().length==0)|| ($("#year").val().length==0)|| ($("#brand").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        description 
      }else{
    let cajas = {
        id:idDesdeBoton,
        brand:$("#brand").val(),
        name:$("#name").val(),
        description:$("#description").val(),
        year:$("#year").val(),
        category:{id: +$("#select-categoria").val()}
    };
    console.log(cajas)

    $.ajax({
        url:"http://129.159.37.204:8080/api/Machine/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se Actualizo correctamente la Maquina");
            window.location.reload();      
         
        } 
     });
    }

}

function deleteMachine (idDesdeBoton){
    //console.log(idDesdeBoton)
    let myData={
        id:idDesdeBoton
    }
    $.ajax({
        url:"http://129.159.37.204:8080/api/Machine/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        // en las dos lineas siguientes armamos el JSON para usar
        data: JSON.stringify(myData),
        contentType:"application/json; charset=utf-8", 
        // armamos el JSON con lo creado en cajas.
        // la funcion JSON.stringify convierte un array en JSON
         
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se Borro correctamente la Maquina");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });

}

///////////////////////////////////
function pintarMachine(json_maquinas){
    // cuando se llama pintarMachine manda la variable respuesta,
    // que es pintar se recibe como json_maquinas
    //NOTE que usted puede cambiar el nmbre de la variable al recibirla.
    //console.log(json_maquinas)
    let myTable="<table>";
   
        let CODIGO = "COD";
        let NOMBRE = "NOMBRE"
        let MARCA = "MARCA";
        let ANO = "AÑO";
        let DESCRIPCION = "DESCRIPCION";
        let CATEGORIA = "CATEGORIA";

        myTable+="<th>"+CODIGO+"</th>";
        myTable+="<th>"+NOMBRE+"</th>";
        myTable+="<th>"+MARCA+"</th>";
        myTable+="<th>"+ANO+"</th>";
        myTable+="<th>"+DESCRIPCION+"</th>";
        myTable+="<th>"+CATEGORIA+"</th>";
        
    for (i=0;i<json_maquinas.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_maquinas[i].id+"</td>";
        myTable+="<td>"+json_maquinas[i].name+"</td>";
        myTable+="<td>"+json_maquinas[i].brand+"</td>";
        myTable+="<td>"+json_maquinas[i].year+"</td>";
        myTable+="<td>"+json_maquinas[i].description+"</td>";
        myTable+="<td>"+json_maquinas[i].category.name+"</td>";
        myTable+="<td> <button class='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='deleteMachine("+json_maquinas[i].id+")'> Borrar</button>";
        myTable+="<td> <button class='text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='putMachine("+json_maquinas[i].id+")'> Actualizar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMachine").html(myTable);
}


/////////////////////////////////

function getCategoria_Machine(){
    $.ajax({
        url:"http://129.159.37.204:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option')

            })
            
        } 
     });

     //esta ajax es el mismo que use en categoria para llenar la tabla de 
     // categorias en la ventana de maquinas. solo debemso varias las acciones 
     // cuando se hace la alectura (success).


}