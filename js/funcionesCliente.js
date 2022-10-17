// GET , POST, PUT y DELETE

function getCliente (){
    $.ajax({
       url:"http://129.159.37.204:8080/api/Client/all",
       type:"GET",
       datatype:"JSON",
       success:function(respuesta){
        //console.log(respuesta);
        pintarCliente(respuesta);
       } 
    });

}

function postCliente (){
    //console.log("#name")
    //console.log("#age")
    //console.log("#email")
    //console.log("#password")

    if($("#name").val().length==0 || ($("#password").val().length==0) || ($("#age").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        email 
      }else{
        // En el POST debemos armar el JSON y el url.
        // en el postman tiene unos headers que muestran lso elementos para formarlo

        //console.log(respuesta);
        let cajas = {
        
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        //console.log(cajas)
        // en cajas recibimos los datos capturados (name y descripcion)
        // receuerde que con # viajan los datos

        // usa el mismo ajax, pero con POST en vez de get y con /save en vez de /all
        $.ajax({
            url:"http://129.159.37.204:8080/api/Client/save",
            type:"POST",
            datatype:"JSON",
            // en las dos lineas siguientes armamos el JSON para usar
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas), 
            // armamos el JSON con lo creado en cajas.
            // la funcion JSON.stringify convierte un array en JSON
            
            success:function(respuesta){

                alert("Se creo correctamente el cliente");
                // metimos el alerta para notificar al usuario de la adicion

                window.location.reload(); 
                // hace al recarga de la pagina html, incluyendo la actualizacion     
            
            } 
        });
    }
}

function putCliente (idDesdeBoton){
    
    if($("#name").val().length==0 || ($("#email").val().length==0) || ($("#password").val().length==0) || ($("#age").val().length==0)){
        // SI tamaño de name o description es cero (estan vacias)
      
        alert("todos los campos son obligatorios");
        email 
      }else{
    let cajas = {
        idClient:idDesdeBoton,
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
        
    };
    //console.log(cajas)

    $.ajax({
        url:"http://129.159.37.204:8080/api/Client/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas), 
        success:function(respuesta){
            //console.log(respuesta)
            alert("Se Actualizo correctamente el cliente");
            window.location.reload();      
         
        } 
     });
    }

}

function deleteCliente (idDesdeBoton){
    //console.log(idDesdeBoton);
    //let myData={
    //    id:idDesdeBoton
    //};
    //pusimos el id dentro de {+ y le asignamos en nombre de myData}

    $.ajax({
        url:"http://129.159.37.204:8080/api/Client/"+idDesdeBoton,
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
            alert("Se Elimino correctamente el cliente");
            // metimos el alerta para notificar al usuario de la adicion

            window.location.reload(); 
            // hace al recarga de la pagina html, incluyendo la actualizacion     
         
        } 
    });


}

///////////////////////////////////
function pintarCliente(respuesta){
    //console.log(respuesta)
    let myTable="<table>";
        let ID = "ID";    
        let NOMBRE = "NOMBRE";
        let EMAIL = "EMAIL";
        //let PASSWORD = "PASSWORD";
        let EDAD = "EDAD";
        myTable+="<th>"+ID+"</th>";
        myTable+="<th>"+NOMBRE+"</th>";
        myTable+="<th>"+EMAIL+"</th>";
        //myTable+="<th>"+PASSWORD+"</th>";
        myTable+="<th>"+EDAD+"</th>";
    
    for (i=0;i<respuesta.length;i++){
     
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        //myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='deleteCliente("+respuesta[i].idClient+")'> Borrar</button>"
        myTable+="<td> <button class='text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onclick='putCliente("+respuesta[i].idClient+")'> Actualizar</button>"
        myTable+="</tr>";
    }
    
    myTable+="</table>";
    $("#resultadoCliente").html(myTable);
}