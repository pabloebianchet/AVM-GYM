// $(document).ready(function () {
//   $.ajax({
//     url: "http://localhost:3000/usuarios", // Ruta en tu servidor para obtener los usuarios
//     type: "GET",
//     success: function (response) {
//       // Limpiar la tabla
//       $("#tabla-usuarios tbody").empty();

//       // Insertar los datos de los usuarios en la tabla
//       response.forEach(function (user) {
//         $("#tabla-usuarios tbody").append(
//           "<tr>" +
//             "<td>" +
//             user.nombre +
//             "</td>" +
//             "<td>" +
//             user.apellido +
//             "</td>" +
//             "<td>" +
//             user.email +
//             "</td>" +
//             "<td>" +
//             user.telefono +
//             "</td>" +
//             "</tr>"
//         );
//       });
//     },
//     error: function (xhr, status, error) {
//       console.error("Error al obtener los usuarios:", error);
//     },
//   });
// });

// $(document).ready(function () {
//   // Función para eliminar un usuario
//   function eliminarUsuario(id) {
//     $.ajax({
//       url: "http://localhost:3000/usuarios/" + id,
//       type: "DELETE",
//       success: function () {
//         // Recargar la tabla después de eliminar el usuario
//         obtenerUsuarios();
//       },
//       error: function (xhr, status, error) {
//         console.error("Error al eliminar el usuario:", error);
//       },
//     });
//   }

//   // Función para obtener los usuarios de la base de datos
//   function obtenerUsuarios() {
//     $.ajax({
//       url: "http://localhost:3000/usuarios", // Ruta en tu servidor para obtener los usuarios
//       type: "GET",
//       success: function (response) {
//         // Limpiar la tabla
//         $("#tabla-usuarios tbody").empty();

//         // Insertar los datos de los usuarios en la tabla
//         response.forEach(function (user) {
//           // Crear una nueva fila de la tabla
//           var newRow = $("<tr>");

//           // Agregar celdas para los datos del usuario
//           newRow.append("<td>" + user.nombre + "</td>");
//           newRow.append("<td>" + user.apellido + "</td>");
//           newRow.append("<td>" + user.email + "</td>");
//           newRow.append("<td>" + user.telefono + "</td>");

//           // Agregar botones de Editar y Borrar
//           newRow.append(
//             '<td><button class="btn btn-primary editar-btn">Editar</button></td>'
//           );
//           newRow.append(
//             '<td><button class="btn btn-danger borrar-btn" data-id="' +
//               user.id +
//               '">Borrar</button></td>'
//           );

//           // Agregar la fila a la tabla
//           $("#tabla-usuarios tbody").append(newRow);
//         });

//         // Agregar evento de clic al botón Borrar
//         $(".borrar-btn").click(function () {
//           var id = $(this).data("id");
//           eliminarUsuario(id);
//         });
//       },
//       error: function (xhr, status, error) {
//         console.error("Error al obtener los usuarios:", error);
//       },
//     });
//   }

//   // Llamar a la función para obtener los usuarios al cargar la página
//   obtenerUsuarios();
// });

$(document).ready(function () {
  // Función para eliminar un usuario
  function eliminarUsuario(id) {
    $.ajax({
      url: "http://localhost:3000/usuarios/" + id,
      type: "DELETE",
      success: function () {
        // Recargar la tabla después de eliminar el usuario
        obtenerUsuarios();
      },
      error: function (xhr, status, error) {
        console.error("Error al eliminar el usuario:", error);
      },
    });
  }

  // Función para obtener los usuarios de la base de datos
  function obtenerUsuarios() {
    $.ajax({
      url: "http://localhost:3000/usuarios", // Ruta en tu servidor para obtener los usuarios
      type: "GET",
      success: function (response) {
        // Limpiar la tabla
        $("#tabla-usuarios tbody").empty();

        // Insertar los datos de los usuarios en la tabla
        response.forEach(function (user) {
          // Crear una nueva fila de la tabla
          var newRow = $("<tr>");

          // Agregar celdas para los datos del usuario
          newRow.append("<td>" + user.nombre + "</td>");
          newRow.append("<td>" + user.apellido + "</td>");
          newRow.append("<td>" + user.email + "</td>");
          newRow.append("<td>" + user.telefono + "</td>");

          // Agregar botones de Editar y Borrar
          newRow.append(
            '<td><button class="btn btn-primary editar-btn" data-id="' +
              user.id +
              '" data-nombre="' +
              user.nombre +
              '" data-apellido="' +
              user.apellido +
              '" data-email="' +
              user.email +
              '" data-telefono="' +
              user.telefono +
              '">Editar</button></td>'
          );
          newRow.append(
            '<td><button class="btn btn-danger borrar-btn" data-id="' +
              user.id +
              '">Borrar</button></td>'
          );

          // Agregar la fila a la tabla
          $("#tabla-usuarios tbody").append(newRow);
        });

        // Agregar evento de clic al botón Borrar
        $(".borrar-btn").click(function () {
          var id = $(this).data("id");
          eliminarUsuario(id);
        });

        // Agregar evento de clic al botón Editar
        $(".editar-btn").click(function () {
          let id = $(this).data("id");
          let nombre = $(this).data("nombre");
          let apellido = $(this).data("apellido");
          let email = $(this).data("email");
          let telefono = $(this).data("telefono");
          // Lógica para abrir un popup o modal con los datos del usuario
          // Aquí puedes agregar el código para abrir el popup/modal y cargar los datos del usuario

          let mensaje =
            "Editar usuario con ID: " +
            id +
            "\n" +
            "Nombre: " +
            nombre +
            "\n" +
            "Apellido: " +
            apellido +
            "\n" +
            "Email: " +
            email +
            "\n" +
            "Teléfono: " +
            telefono;

          // Mostrar el mensaje
          alert(mensaje);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al obtener los usuarios:", error);
      },
    });
  }

  // Llamar a la función para obtener los usuarios al cargar la página
  obtenerUsuarios();
});
