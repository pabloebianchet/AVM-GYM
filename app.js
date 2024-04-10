// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// app.use(express.static(__dirname));

// // Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "basegym",
// });

// // Conexión a la base de datos
// connection.connect((error) => {
//   if (error) {
//     console.error("Error al conectar a la base de datos: ", error);
//     return;
//   }
//   console.log("Conexión a la base de datos exitosa");
// });

// // Middleware para analizar datos del formulario
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Ruta para servir el formulario HTML
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/formulario.html");
// });

// // Ruta para procesar el formulario y guardar el cliente en la base de datos
// app.post("/guardar_cliente", (req, res) => {
//   const { nombre, apellido, email, telefono } = req.body;

//   const sql = `INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)`;
//   const values = [nombre, apellido, email, telefono];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error("Error al guardar el cliente en la base de datos: ", error);
//       res.status(500).send("Error al guardar el cliente en la base de datos");
//       return;
//     }
//     console.log("Cliente guardado correctamente en la base de datos");
//     res.redirect("/"); // Redirigir de vuelta a la vista anterior (formulario.html)
//   });
// });

// // Ruta para obtener los usuarios de la base de datos
// app.get("/usuarios", (req, res) => {
//   connection.query("SELECT * FROM usuarios", (error, results, fields) => {
//     if (error) {
//       console.error("Error al obtener los usuarios:", error);
//       res.status(500).send("Error al obtener los usuarios de la base de datos");
//       return;
//     }
//     res.json(results); // Enviar los datos de los usuarios como respuesta en formato JSON
//   });
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });

/////////// de aca para abajo funciona perfecto sin el login aun

// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// app.use(express.static(__dirname));

// // Configuración de la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "basegym",
// });

// // Conexión a la base de datos
// connection.connect((error) => {
//   if (error) {
//     console.error("Error al conectar a la base de datos: ", error);
//     return;
//   }
//   console.log("Conexión a la base de datos exitosa");
// });

// // Middleware para analizar datos del formulario
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Ruta para servir el formulario HTML
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/formulario.html");
// });

// // Ruta para procesar el formulario y guardar el cliente en la base de datos
// app.post("/guardar_cliente", (req, res) => {
//   const { nombre, apellido, email, telefono } = req.body;

//   const sql = `INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)`;
//   const values = [nombre, apellido, email, telefono];

//   connection.query(sql, values, (error, results) => {
//     if (error) {
//       console.error("Error al guardar el cliente en la base de datos: ", error);
//       res.status(500).send("Error al guardar el cliente en la base de datos");
//       return;
//     }
//     console.log("Cliente guardado correctamente en la base de datos");
//     res.redirect("/"); // Redirigir de vuelta a la vista anterior (formulario.html)
//   });
// });

// // Ruta para obtener los usuarios de la base de datos
// app.get("/usuarios", (req, res) => {
//   connection.query("SELECT * FROM usuarios", (error, results, fields) => {
//     if (error) {
//       console.error("Error al obtener los usuarios:", error);
//       res.status(500).send("Error al obtener los usuarios de la base de datos");
//       return;
//     }
//     res.json(results); // Enviar los datos de los usuarios como respuesta en formato JSON
//   });
// });

// // Ruta para eliminar un usuario de la base de datos
// app.delete("/usuarios/:id", (req, res) => {
//   const userId = req.params.id;

//   // Ejecutar la consulta SQL para eliminar el usuario
//   const sql = "DELETE FROM usuarios WHERE id = ?";
//   connection.query(sql, [userId], (error, results) => {
//     if (error) {
//       console.error("Error al eliminar el usuario:", error);
//       res.status(500).send("Error al eliminar el usuario");
//       return;
//     }
//     console.log("Usuario eliminado correctamente");
//     res.sendStatus(200); // Enviar respuesta de éxito
//   });
// });

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });

///////////////////////////

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "basegym",
});

connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos: ", error);
    return;
  }
  console.log("Conexión a la base de datos exitosa");
});

// Ruta para servir el formulario HTML de inicio de sesión
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Ruta para procesar el inicio de sesión y redirigir al formulario si es exitoso
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM empleados WHERE email = ? AND password = ?",
    [email, password],
    (error, results, fields) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        return res.status(500).send("Error de servidor");
      }

      if (results.length === 0) {
        return res.status(401).send("Usuario o contraseña incorrectos");
      }

      res.redirect("/formulario.html");
    }
  );
});

app.post("/guardar_cliente", (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;

  const sql = `INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)`;
  const values = [nombre, apellido, email, telefono];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error al guardar el cliente en la base de datos: ", error);
      res.status(500).send("Error al guardar el cliente en la base de datos");
      return;
    }
    console.log("Cliente guardado correctamente en la base de datos");
    res.redirect("/");
  });
});

app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (error, results, fields) => {
    if (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error al obtener los usuarios de la base de datos");
      return;
    }
    res.json(results);
  });
});

app.delete("/usuarios/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM usuarios WHERE id = ?";
  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("Error al eliminar el usuario");
      return;
    }
    console.log("Usuario eliminado correctamente");
    res.sendStatus(200);
  });
});

//acciones para clientes.html//

app.get("/empleados", (req, res) => {
  connection.query("SELECT * FROM empleados", (error, results, fields) => {
    if (error) {
      console.error("Error al obtener los empleados:", error);
      res
        .status(500)
        .send("Error al obtener los empleados de la base de datos");
      return;
    }
    res.json(results);
  });
});

app.delete("/empleados/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM empleados WHERE id = ?";
  connection.query(sql, [empleadoId], (error, results) => {
    if (error) {
      console.error("Error al eliminar el empleado:", error);
      res.status(500).send("Error al eliminar el empleado");
      return;
    }
    console.log("Empleado eliminado correctamente");
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
