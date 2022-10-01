/* -------------------------------------------------------------------------
   Creación de evento en el 'document' para que se ejecuta al momento de
   cargarse la página.
   -------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", leerMensajes);


/* -------------------------------------------------------------------------
   Función que se encargar de traer la información de los clientes desde
   la API de Oracle.
   -------------------------------------------------------------------------
 */
function leerMensajes() {
   //FUNCION GET
   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
      type: "GET",
      dataType: "json",
      success: function (mensajes) {
         let cs = mensajes.items;
         let MyTBody = "";

         $("#listaMensajes").empty();
         for (let i = 0; i < cs.length; i++) {
            MyTBody += "<tr>";
            MyTBody += "<td scope=\"row\" class=\"scope\">" + cs[i].id + "</td>";
            MyTBody += "<td>" + cs[i].messagetext + "</td>";
            MyTBody += `<td><a class='linkBtn' href='message.html?id=${cs[i].id}' class='btn-editar'>Detail</a></td>`;
            MyTBody += `<td><a class='linkBtn' href='newMessage.html?id=${cs[i].id}&messagetext=${cs[i].messagetext}' class='btn-editar'>Edit</a></td>`;
            MyTBody += `<td><button onclick='eliminarMensaje(${cs[i].id})' class='btn-eliminar'>Delete</button></td>`;
            MyTBody += "</tr>";
         }
         $("#listaMensajes").append(MyTBody);
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
function eliminarMensaje(idMensaje) {
   let data = {
      id: idMensaje
   };
   let dataToSend = JSON.stringify(data);
   $.ajax({
      url: `https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message`,
      type: "DELETE",
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#messagetext").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "messages.html";
      }
   });
}

/* -------------------------------------------------------------------------
   Función que se encarga de guardar la información del cliente en la BD,
   al enviar los datos al API de Oracle.
   -------------------------------------------------------------------------
 */
function guardarMensaje() {
   let id = $("#id").val();
   let messagetext = $("#messagetext").val();
   let data = {
      id: id,
      messagetext: messagetext
   };
   let dataToSend = JSON.stringify(data);

   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
      type: "POST",
      data: dataToSend,
      contentType: 'application/json',
      success: function (pepito) {
         $("#id").val("");
         $("#messagetext").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "messages.html";
      }
   });
}


/* -------------------------------------------------------------------------
   Función que se encarga de editar la información de un cliente en la BD.
   -------------------------------------------------------------------------
 */
function editarMensaje() {
   let id = $("#id").val();
   let messagetext = $("#messagetext").val();
   let data = {
      id: id,
      messagetext: messagetext
   };
   let dataToSend = JSON.stringify(data);
   //console.log(dataToSend);
   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
      type: "PUT",
      //   dataType : 'json',
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#name").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "messages.html";
      }
   });
}