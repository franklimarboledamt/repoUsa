/* ----------------------------------------------------------------
   Funcion que captura las variables pasados por GET y devuelve
   un array de clave=>valor.
   ----------------------------------------------------------------
*/
function getGET() {
   // capturamos la url
   var loc = document.location.href;
   // si existe el interrogante
   if (loc.indexOf('?') > 0) {
      // cogemos la parte de la url que hay despues del interrogante
      var getString = loc.split('?')[1];
      // obtenemos un array con cada clave=valor
      var GET = getString.split('&');
      var get = {};
      // recorremos todo el array de valores
      for (var i = 0, l = GET.length; i < l; i++) {
         var tmp = GET[i].split('=');
         get[tmp[0]] = unescape(decodeURI(tmp[1]));
      }
      return get;
   }
}


/* ----------------------------------------------------------------
   Función que se ejecuta al cargarse la página, hace el llamado
   a la función 'getGET' para capturar las variables que vienen
   por la URL.
   ----------------------------------------------------------------
*/
window.onload = function () {
   // Tomamos el array de los valores pasados por la URL
   var valores = getGET();
   if (valores) {
      // Extraemos los valores del array
      var id = valores['id'];

      //FUNCION GET
      $.ajax({
         url: `https://gd548c9243e8650-g7ri4s1qk8952qk0.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client/${id}`,
         type: "GET",
         dataType: "json",
         success: function (clientes) {
            let cs = clientes.items;
            let MyTBody = "";

            $("#listaClientes").empty();
            for (let i = 0; i < cs.length; i++) {
               MyTBody += "<tr>";
               MyTBody += "<th scope=\"row\" class=\"scope\">" + cs[i].id + "</th>";
               MyTBody += `<th>${cs[i].name}</th>`;
               MyTBody += "<th>" + cs[i].email + "</th>";
               MyTBody += "<th>" + cs[i].age + "</th>";
               MyTBody += "</tr>";
               MyTBody += `<tr><td colspan="5">&nbsp;</td></tr>`;
               MyTBody += `<tr><td colspan='5' class='centrarBotonCancelar'><a href='clients.html' class='linkBtn'>Back</a></td></tr>`;
            }
            $("#listaClientes").append(MyTBody);
         },
         error: function (xhr, status) {
            alert('Ha ocurrido un problema');
         }
      });
   } else {
      // no se ha recibido ningun parametro por GET
      //document.write("No se ha recibido ningún parámetro");
   }
}