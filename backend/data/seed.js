import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "../config/db.js";
import Services from "../models/Services.js"; // Importar el modelo de servicios
import { services } from "./beautyServices.js"; // Importar los servicios de belleza

dotenv.config(); // Cargar las variables de entorno desde el archivo .env
await connectDB(); // Conectar a la base de datos

async function seedDb() {
  try {
    // Insertar los datos de servicios en la base de datos
    await Services.insertMany(services);

    console.log(
      colors.green.bold("Datos de servicios importados correctamente")
    );
    process.exit(0); // Salir del proceso con éxito
  } catch (error) {
    console.error(
      colors.red(
        "Error al importar los datos de servicios:",
        colors.bold(error)
      )
    );
    process.exit(1); // Salir del proceso con un código de error
  }
}

async function clearDb() {
  try {
    // Limpiar la colección de servicios
    await Services.deleteMany({});

    console.log(
      colors.bgMagenta.bold("Datos de servicios eliminados correctamente")
    );
    process.exit(0); // Salir del proceso con éxito
  } catch (error) {
    console.error(
      colors.red(
        "Error al eliminar los datos de servicios:",
        colors.bold(error)
      )
    );
    process.exit(1); // Salir del proceso con un código de error
  }
}

// process.argv es un arreglo que contiene los argumentos de línea de comandos pasados al proceso de Node.js
// Si el primer argumento es '--import', llamará a la función seedDb
// Si el primer argumento es '--clear', llamará a la función clearDb
// Esto te permite ejecutar el script con diferentes comandos para importar o limpiar la base de datos
if (process.argv.includes("--import")) {
  seedDb();
} else if (process.argv.includes("--clear")) {
  clearDb();
}
