$(document).ready(function () {
  // Función para eliminar un usuario
  function eliminarEmpleado(id) {
    $.ajax({
      url: "http://localhost:3000/empleados/" + id,
      type: "DELETE",
      success: function () {
        // Recargar la tabla después de eliminar el usuario
        obtenerEmpleado();
      },
      error: function (xhr, status, error) {
        console.error("Error al eliminar el empleado:", error);
      },
    });
  }

  function obtenerEmpleados() {
    $.ajax({
      url: "http://localhost:3000/empleados",
      type: "GET",
      success: function (response) {
        // Limpiar la tabla
        $("#tabla-empleados tbody").empty();

        response.forEach(function (empleado) {
          var newRow = $("<tr>");

          // Agregar celdas para los datos del usuario
          newRow.append("<td>" + empleado.email + "</td>");
          newRow.append("<td>" + empleado.password + "</td>");
          newRow.append("<td>" + empleado.perfil + "</td>");

          // Agregar botones de Editar y Borrar
          newRow.append(
            '<td><button class="btn btn-primary editar-btn" data-id="' +
              empleado.id +
              '" data-email="' +
              empleado.email +
              '" data-password="' +
              empleado.password +
              '" data-perfil="' +
              empleado.perfil +
              '">Editar</button></td>'
          );
          newRow.append(
            '<td><button class="btn btn-danger borrar-btn" data-id="' +
              empleado.id +
              '">Borrar</button></td>'
          );

          // Agregar la fila a la tabla
          $("#tabla-empleados tbody").append(newRow);
        });

        // Agregar evento de clic al botón Borrar
        $(".borrar-btn").click(function () {
          var id = $(this).data("id");
          eliminarEmpleado(id);
        });

        // Agregar evento de clic al botón Editar
        $(".editar-btn").click(function () {
          let id = $(this).data("id");
          let email = $(this).data("email");
          let password = $(this).data("password");
          let perfil = $(this).data("perfil");
          // Lógica para abrir un popup o modal con los datos del usuario
          // Aquí puedes agregar el código para abrir el popup/modal y cargar los datos del usuario

          let mensaje = "Editar empleado con ID: " + id + "\n" + "email: ";

          // Mostrar el mensaje
          alert(mensaje);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error al obtener los empleados:", error);
      },
    });
  }

  // Llamar a la función para obtener los usuarios al cargar la página
  obtenerEmpleados();
});
