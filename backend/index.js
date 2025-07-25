// express es un framework de node.js que permite crear aplicaciones web y APIs de manera sencilla
import express from "express";
// dotenv es un paquete que permite cargar variables de entorno desde un archivo .env
import dotenv from "dotenv";
// colors es un paquete que permite dar color a los mensajes en la consola
import colors from "colors";
import cors from "cors"; // Importar cors para manejar solicitudes de diferentes orígenes
// Importar la función de conexión a la base de datos
import { connectDB } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js"; // Importar la ruta de servicios
import authRoutes from "./routes/authRoutes.js"; // Importar las rutas de autenticación
import appointmentsRoutes from "./routes/appointmentRoutes.js"; // Importar las rutas de citas

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configurar la app
const app = express();

// Leer datos via body
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// Middleware para manejar errores de sintaxis JSON
// Este middleware captura errores de sintaxis JSON y devuelve un mensaje de error adecuado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    const error = new Error("JSON malformado");
    return res.status(400).json({
      msg: error.message,
      details: err.message,
    });
  }
  next();
});

// Conectar a la base de datos
connectDB();

// Habilitar CORS para permitir solicitudes desde diferentes orígenes
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_JWT]; // Lista blanca de orígenes permitidos

const corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.includes(origin) || !origin) {
      callback(null, true); // Permitir el origen si está en la lista blanca o si no hay origen (por ejemplo, solicitudes desde Postman)
    } else {
      callback(new Error("No permitido por CORS")); // Rechazar el origen si no está en la lista blanca
    }
  },
};

app.use(cors(corsOptions)); // Middleware para permitir solicitudes desde diferentes orígenes (Cross-Origin Resource Sharing)

// Definir una ruta
// Un middleware en Express.js es una función que se ejecuta durante el ciclo de vida de una solicitud HTTP.
// Puede modificar la solicitud (req), la respuesta (res), o finalizar la solicitud. Los middlewares se usan
// para tareas como autenticación, manejo de errores, parseo de datos, y definición de rutas.
// El siguiente middleware registra el módulo 'servicesRoute' para manejar todas las solicitudes que comiencen con '/api/services'.
// Esto permite organizar las rutas relacionadas con servicios en un archivo separado, facilitando la escalabilidad y el mantenimiento del código.
app.use("/api/services", servicesRoutes);

app.use("/api/auth", authRoutes); // Registrar las rutas de autenticación

app.use('/api/appointments', appointmentsRoutes); // Registrar las rutas de citas

// Definir el puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(
    colors.blue("Servidor corriendo en el puerto", colors.bold(PORT))
  );
});
