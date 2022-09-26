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
      var name = valores['name'];
      var email = valores['email'];
      var age = valores['age'];

      // Cargar las cajas de texto con los valores
      $("#id").val(id);
      $("#name").val(name);
      $("#email").val(email);
      $("#age").val(age);

      // Desabilitar la caja de texto del 'id'
      $("#id").prop('disabled', true);

      // Cambiar título del formulario
      $("#titleClient").text("Edit Client");

      // Mostrar botón 'Editar' y ocultar 'Guardar'
      $("#btnEditar").addClass("mostrar");
      $("#btnGuardar").addClass("ocultar");
      $("#linkBtnCancelar").addClass("mostrar");
   } else {
      // no se ha recibido ningun parametro por GET
      //document.write("No se ha recibido ningún parámetro");
   }
}