import mongoose from "mongoose";

// Validar un object ID
function isValidObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El ID del servicio no es válido");
    return res.status(400).json({
      msg: error.message,
    });
  }
}

// Validar si el servicio existe
function isServiceExists(service, res) {
    if (!service) {
      const error = new Error("Servicio no encontrado");
      return res.status(404).json({
        msg: error.message,
      });
    }
}

// Validar que no haya campos vacíos
function validateFields(req, res) {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({
      msg: error.message,
    });
  }
}

// Validar que req.body no sea un objeto vacío o que no tenga campos
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}   

 // Verificar si el usuario ya existe
function isUserExists(user, res) {
  if (user) {
    const error = new Error("El usuario ya está registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }
}

// Generar un ID único
// Esta función genera un ID único basado en la fecha actual y un número aleatorio
const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

export {isValidObjectId, isServiceExists, validateFields, isEmptyObject ,isUserExists, uniqueId}
