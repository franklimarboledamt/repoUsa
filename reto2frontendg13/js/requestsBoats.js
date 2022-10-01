/* -------------------------------------------------------------------------
   Creación de evento en el 'document' para que se ejecuta al momento de
   cargarse la página.
   -------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", leerBarcos);


/* -------------------------------------------------------------------------
   Función que se encargar de traer la información de los clientes desde
   la API de Oracle.
   -------------------------------------------------------------------------
 */
function leerBarcos() {
   //FUNCION GET
   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/boat/boat",
      type: "GET",
      dataType: "json",
      success: function (barcos) {
         //alert("Barcos" + barcos);
         let cs = barcos.items;
         let MyTBody = "";

         $("#listaBarcos").empty();
         for (let i = 0; i < cs.length; i++) {
            MyTBody += "<tr>";
            MyTBody += "<th scope=\"row\" class=\"scope\">" + cs[i].id + "</th>";
            //MyTBody += `<td><a href='boat.html?id=${cs[i].id}'>${cs[i].brand}</a></td>`;
            //MyTBody += "<td>" + cs[i].model + "</td>";
            //MyTBody += "<td>" + cs[i].category_id + "</td>";
            MyTBody += "<td>" + cs[i].name + "</td>";
            MyTBody += `<td><a class='linkBtn' href='boat.html?id=${cs[i].id}' class='btn-editar'>Detail</a></td>`;
            MyTBody += `<td><a class='linkBtn' href='newBoat.html?id=${cs[i].id}&brand=${cs[i].brand}&model=${cs[i].model}&category_id=${cs[i].category_id}&name=${cs[i].name}' class='btn-editar'>Edit</a></td>`;
            MyTBody += `<td><button onclick='eliminarBarco(${cs[i].id})' class='btn-eliminar'>Delete</button></td>`;
            MyTBody += "</tr>";
         }
         $("#listaBarcos").append(MyTBody);
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
function eliminarBarco(idBarco) {
   let data = {
      id: idBarco
   };
   let dataToSend = JSON.stringify(data);
   $.ajax({
      url: `https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/boat/boat`,
      type: "DELETE",
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#brand").val("");
         $("#model").val("");
         $("#category_id").val("");
         $("#name").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "boats.html";
      }
   });
}

/* -------------------------------------------------------------------------
   Función que se encarga de guardar la información del cliente en la BD,
   al enviar los datos al API de Oracle.
   -------------------------------------------------------------------------
 */
function guardarBarco() {
   let id = $("#id").val();
   let brand = $("#brand").val();
   let model = $("#model").val();
   let category_id = $("#category_id").val();
   let name = $("#name").val();
   let data = {
      id: id,
      brand: brand,
      model: model,
      category_id: category_id,
      name: name
   };
   let dataToSend = JSON.stringify(data);

   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/boat/boat",
      type: "POST",
      data: dataToSend,
      contentType: 'application/json',
      success: function (pepito) {
         $("#id").val("");
         $("#brand").val("");
         $("#model").val("");
         $("#category_id").val("");
         $("#name").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "boats.html";
      }
   });
}


/* -------------------------------------------------------------------------
   Función que se encarga de editar la información de un cliente en la BD.
   -------------------------------------------------------------------------
 */
function editarBarco() {
   let id = $("#id").val();
   let brand = $("#brand").val();
   let model = $("#model").val();
   let category_id = $("#category_id").val();
   let name = $("#name").val();
   let data = {
      id: id,
      brand: brand,
      model: model,
      category_id: category_id,
      name: name
   };
   let dataToSend = JSON.stringify(data);
   $.ajax({
      url: "https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/boat/boat",
      type: "PUT",
      data: dataToSend,
      contentType: "application/json",
      success: function (pepito) {
         $("#id").val("");
         $("#brand").val("");
         $("#model").val("");
         $("#category_id").val("");
         $("#name").val("");
      },
      error: function (xhr, status) {
         alert('Ha ocurrido un problema');
      },
      complete: function () {
         location.href = "boats.html";
      }
   });
}