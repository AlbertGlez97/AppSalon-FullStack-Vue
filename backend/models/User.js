import mongoose from "mongoose";
import { uniqueId } from "../utils/index.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  token: {
    type: String,
    default: () => uniqueId(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// Middleware para encriptar la contraseña antes de guardar el usuario
// Antes de guardar un documento de usuario, se ejecuta esta función middleware 'pre'.
// 'save' indica que se ejecuta antes de la operación de guardado en la base de datos.
userSchema.pre("save", async function (next) {
    // Verifica si el campo 'password' ha sido modificado.
    // Esto es importante para no volver a hashear una contraseña ya hasheada.
    if (this.isModified("password")) {
        // Importa dinámicamente el módulo 'bcrypt' para el hasheo de contraseñas.
        const bcrypt = await import("bcrypt");
        // Genera una 'salt' (sal) con un factor de costo de 10.
        // La sal añade aleatoriedad al hash para mayor seguridad.
        const salt = await bcrypt.genSalt(10);
        // Hashea la contraseña del usuario usando la sal generada.
        // El resultado reemplaza la contraseña original en el documento.
        this.password = await bcrypt.hash(this.password, salt);
    }
    // Llama a 'next()' para continuar con el proceso de guardado.
    next();
});

// Método para comparar la contraseña ingresada con la almacenada en la base de datos
userSchema.methods.comparePassword = async function (password) {
  // Importa dinámicamente el módulo 'bcrypt' para comparar contraseñas.
  const bcrypt = await import("bcrypt");
  // Compara la contraseña ingresada con la hasheada almacenada en el documento.
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;