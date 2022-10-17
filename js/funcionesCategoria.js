// GET , POST, PUT y DELETE

function getCategoria (){
    $.ajax({
       url:"http://129.159.37.204:8080/api/Category/all",
       type:"GET",
       datatype:"JSON",
       success:function(respuesta){
        //console.log(respuesta);
        pintarCategoria(respuesta);
       } 
    });

}
// Get Categoria es llamada desde categoria.html
// es una llamado ajax para  poder leer todo lo que hay en la tabla categoria
// a travez del url definido dentro del ajax.
// lo recibido lo pone en respuesta, lo visualiza en consola ( para control)
// y llama la funcioin pintar Categoria. Para visualizar lo leido en la pantalla
// busque pintarCategoria mas abajo.


function postCategoria (){
 // En el POST debemos armar el JSON y el url.
 // en el postman tiene unos headers que muestran los elementos para formarlo

 //Vamos a validar no hay datos vacias:
  if($("#name").val().length==0 || ($("#description").val().length==0)){
    // SI tamaño de name o description es cero (estan vacias)
  
    alert("todos los campos son obligatorios");
    description 
  }else{ 
    // Si ninguno est avacio, este corchete debe incluir todo el llamado ajaX
    //console.log(respuesta);
    let cajas = {
        name:$("#name").val(),
        description:$("#description").val(),
    };
    // en cajas recibimos los datos capturados (name y descripcion)
    // receuerde que con id y #dato viajan los datos.
    // en Cajas, tenemos la información que va a viajar dentro del JSON

    // usa el mismo ajax, pero con POST en vez de get y con /save en vez de /all
    $.ajax({
        url:"http://129.159.37.204:8080/api/Category/save",
        type:"POST",
        datatype:"JSON",
        // en las dos lineas siguientes armamos el JSON para usar
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        // armamos el JSON con lo creado en cajas.
        // la funcion JSON.stringify convierte un array en JSON
         
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se creo correctamente la categoria");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });
  }
}



function putCategoria (idDesdeBoton){
    if($("#name").val().length==0 || ($("#description").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        description 
      }else{
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        description:$("#description").val(),
    };
    //console.log(cajas)

    $.ajax({
        url:"http://129.159.37.204:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            alert("Se Actualizo correctamente la categoria");
            window.location.reload();      
         
        } 
     });
    }
}


function deleteCategoria (idDesdeBoton){
    //console.log(idDesdeBoton);
    //let myData={
    //    id:idDesdeBoton
    //};
    //pusimos el id dentro de {+ y le asignamos en nombre de myData}

    $.ajax({
        url:"http://129.159.37.204:8080/api/Category/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        //console.log(url)
        // en las dos lineas siguientes armamos el JSON para usar
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(idDesdeBoton), 
        // armamos el JSON con lo creado en cajas.
        // la funcion JSON.stringify convierte un array en JSON
         
        success:function(respuesta){
            //console.log(idDesdeBoton)
            alert("Se Borro correctamente La Categoria");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });

}

///////////////////////////////////
function pintarCategoria(respuesta){

    //console.log(respuesta)
    
    let myTable="<table>";
        let ID = "ID";
        let NOMBRE = "NOMBRE";
        let DESCRIPCION = "DESCRIPCION";
        myTable+="<th>"+ID+"</th>";
        myTable+="<th>"+NOMBRE+"</th>";
        myTable+="<th>"+DESCRIPCION+"</th>";
    
    for (i=0;i<respuesta.length;i++){
     
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='deleteCategoria("+respuesta[i].id+") '> Borrar</button>"
        myTable+="<td> <button class='text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='putCategoria("+respuesta[i].id+")'> Actualizar</button>"        
        myTable+="</tr>";
    }
    
    myTable+="</table>";
    $("#resultado1").html(myTable);

}
// pintarCategoria recibe la info leida por el ajax en respuesta
// y mediante un loop lo visualiza.
// let myTable="<table>"  define la variable myTable como una <tabla> html
// receurde que habre con myTable="<table>" y cierra con myTable+="</table>" 
// el for hace el ciclo sobre lo que se leyo en respuesta
// <tr> define las filas</tr>
// <th> define las columnas dentro de cada fila</th> 
// Nota: respuesta Lee TOda la info de la tabla, pero  hacenmos los <td> 
// solo para los que vamos a mostrar
//+= se usa para ir incrementando y no sobreescribir

// finalmente despues de hecha toda la tabla la voy a mandar con la etiqueta #resultado1 a 
// la pagina html que nos la solicito leer y pintar (categoria.html)
// en $("#resultado1").html(myTable) asigno la tabla (myTable) hecha a 
// #resultado1 para mandar a cliente.html