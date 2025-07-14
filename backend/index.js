// express es un framework de node.js que permite crear aplicaciones web y APIs de manera sencilla
import express from 'express'; 
// dotenv es un paquete que permite cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv'; 
// colors es un paquete que permite dar color a los mensajes en la consola
import colors from 'colors';
// Importar la función de conexión a la base de datos
import { connectDB } from './config/db.js'; 
import servicesRoute from './routes/servicesRoute.js'; // Importar la ruta de servicios

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configurar la app 
const app = express();

// Leer datos via body
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// Middleware para manejar errores de sintaxis JSON
// Este middleware captura errores de sintaxis JSON y devuelve un mensaje de error adecuado
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    const error = new Error("JSON malformado");
    return res.status(400).json({
      msg: error.message,
      details: err.message
    })
  }
  next()
})

// Conectar a la base de datos
connectDB();

// Definir una ruta
// Un middleware en Express.js es una función que se ejecuta durante el ciclo de vida de una solicitud HTTP.
// Puede modificar la solicitud (req), la respuesta (res), o finalizar la solicitud. Los middlewares se usan 
// para tareas como autenticación, manejo de errores, parseo de datos, y definición de rutas.
// El siguiente middleware registra el módulo 'servicesRoute' para manejar todas las solicitudes que comiencen con '/api/services'.
// Esto permite organizar las rutas relacionadas con servicios en un archivo separado, facilitando la escalabilidad y el mantenimiento del código.
app.use('/api/services', servicesRoute)

// Definir el puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue('Servidor corriendo en el puerto', colors.bold(PORT)));
});