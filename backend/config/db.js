import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    // Conectar a la base de datos MongoDB usando Mongoose
    const db = await mongoose.connect(
      process.env.MONGODB_URL
    );
    // Mostrar la URL de la base de datos en la consola
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(colors.cyan('Conectado a la base de datos MongoDB en:', colors.bold(url)));
  } catch (error) {
    console.error(colors.red("Error al conectar a la base de datos:", colors.bold(error)));
    process.exit(1); // Terminar el proceso si hay un error de conexión
  }
};
