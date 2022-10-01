/* -------------------------------------------------------------------------
   Creación de evento en el 'document' para que se ejecuta al momento de
   cargarse la página.
   -------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", leerClientes);


/* -------------------------------------------------------------------------
   Función que se encargar de traer la información de los clientes desde
   la API de Oracle.
   -------------------------------------------------------------------------
 */
function leerClientes() {
   //FUNCION GET
   $.ajax({
      url: "http://localhost:8080/projectDB-0.0.1-SNAPSHOT/producto/list",
      type: "GET",
      dataType: "json",
      success: function (productos) {
         // En este caso la respuesta 'productos' corresponde a los items entregados por la API
         // por eso obviamos el paso de sacar los 'items'
         //alert("Veremos los datos" + productos);
         //let cs = productos.items;
         //console.log(cs);
         let MyTBody = "";

         $("#listaProductos").empty();
         for (let i = 0; i < productos.length; i++) {
            MyTBody += "<tr>";
            MyTBody += "<th scope=\"row\" class=\"scope\">" + productos[i].id + "</th>";
            MyTBody += "<td>" + productos[i].nombre + "</td>";
            MyTBody += "<td>" + productos[i].precio + "</td>";
            MyTBody += `<td><a class='linkBtn' href='newClient.html?id=${productos[i].id}&name=${productos[i].nombre}&email=${productos[i].precio}' class='btn-editar'>Edit</a></td>`;
            MyTBody += `<td><button onclick='eliminarCliente(${productos[i].id})' class='btn-eliminar'>Delete</button></td>`;
            MyTBody += "</tr>";
         }
         $("#listaProductos").append(MyTBody);
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      }
   });
}

/* -------------------------------------------------------------------------
   Función que se encarga de eliminar un cliente en la BD del API de Oracle.
   -------------------------------------------------------------------------
 */
/*function eliminarCliente(idCliente) {
   let data = {
      id: idCliente
   };
   let dataToSend = JSON.stringify(data);
   //console.log(dataToSend);
   $.ajax({
      url: `https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client`,
      type: "DELETE",
      //   dataType : 'json',
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#name").val("");
         $("#email").val("");
         $("#age").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "clients.html";
      }
   });
}*/

/* -------------------------------------------------------------------------
   Función que se encarga de guardar la información del cliente en la BD,
   al enviar los datos al API de Oracle.
   -------------------------------------------------------------------------
 */
/*function guardarCliente() {
   let id = $("#id").val();
   let name = $("#name").val();
   let email = $("#email").val();
   let age = $("#age").val();
   let data = {
      id: id,
      name: name,
      email: email,
      age: age
   };
   let dataToSend = JSON.stringify(data);

   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
      type: "POST",
      data: dataToSend,
      contentType: 'application/json',
      success: function (pepito) {
         $("#id").val("");
         $("#name").val("");
         $("#email").val("");
         $("#age").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "clients.html";
      }
   });
}*/


/* -------------------------------------------------------------------------
   Función que se encarga de editar la información de un cliente en la BD.
   -------------------------------------------------------------------------
 */
/*function editarCliente() {
   let id = $("#id").val();
   let name = $("#name").val();
   let email = $("#email").val();
   let age = $("#age").val();
   let data = {
      id: id,
      name: name,
      email: email,
      age: age
   };
   let dataToSend = JSON.stringify(data);
   //console.log(dataToSend);
   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
      type: "PUT",
      //   dataType : 'json',
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#name").val("");
         $("#email").val("");
         $("#age").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "clients.html";
      }
   });
}*/