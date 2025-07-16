import User from "../models/User.js";
import { validateFields, isEmptyObject, isUserExists } from "../utils/index.js";
import { sendEmailVerification } from "../emails/authEmailService.js";

const register = async (req, res) => {
  // Verificar si el cuerpo de la solicitud está vacío
  if (isEmptyObject(req.body)) return;

  // Validar que no haya campos vacíos
  if (validateFields(req, res)) return;

  const { name, email, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  // Si el usuario ya existe, devolver un error
  if (isUserExists(existingUser, res)) return;

  // Validar la extension de la contraseña
  if (password.length < 8) {
    const error = new Error("La contraseña debe tener al menos 8 caracteres");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    // Crear un nuevo usuario
    const user = new User(req.body);
    const result = await user.save(); // Guardar el usuario en la base de datos

    // Enviar un correo electrónico de verificación
    const { name, email, token } = result;
    await sendEmailVerification({ name, email, token });

    res.status(201).json({
      msg: "Usuario registrado correctamente",
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({
      msg: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

/****************************************************************************************************************/
const verifyAccount = async (req, res) => {
  const { token } = req.params; 

    // Buscar el usuario por el token de verificación
    const user = await User.findOne({ token });

    // Si no se encuentra el usuario, devolver un error
    if (!user) {
      const error = new Error("Token de verificación inválido");
      return res.status(401).json({
        msg: error.message,
      });
    }

    // Si el token es válido, actualizar el estado del usuario a verificado
    try {
      user.token = null; // Limpiar el token de verificación
      user.verified = true; // Marcar al usuario como verificado
      await user.save(); // Guardar los cambios en la base de datos

      res.status(200).json({
        msg: "Cuenta verificada correctamente",
      });
    } catch (error) {
      console.error("Error al verificar la cuenta:", error);
      res.status(500).json({
        msg: "Error al verificar la cuenta",
        error: error.message,
      });
    }
}

/****************************************************************************************************************/
const login = async (req, res) => {
    const { email, password } = req.body;
    // Validar que no haya campos vacíos
    if (validateFields(req, res)) return;   
    // Buscar el usuario por el correo electrónico
    const user = await User.findOne({ email });
    // Si no se encuentra el usuario, devolver un error     
    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({
        msg: error.message,
      });
    }
    // Verificar si el usuario está verificado
    if (!user.verified) {
        const error = new Error("Cuenta no verificada");
        return res.status(401).json({
            msg: error.message,
        });
        }

    // Verificar la contraseña
    if( await user.comparePassword(password)) {
        // Si la contraseña es correcta, devolver el usuario
        res.status(200).json({
            msg: "Inicio de sesión exitoso",
        });
    }else {
        // Si la contraseña es incorrecta, devolver un error
        const error = new Error("Contraseña incorrecta");
        return res.status(401).json({
            msg: error.message,
        });
    }   
}

export { register , verifyAccount, login};
