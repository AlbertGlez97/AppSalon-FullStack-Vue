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

export {isValidObjectId, isServiceExists, validateFields};
