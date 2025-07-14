import Services from "../models/Services.js"; // Importar el modelo de servicios
import {
  isValidObjectId,
  isServiceExists,
  validateFields,
} from "../utils/index.js";

/**********************************************************************************************************************************************************/
// req = request => solicitud
// res = response => respuesta
const createServices = async (req, res) => {
  // Validar que no haya campos vacíos
  if (validateFields(req, res)) return;

  try {
    const service = new Services(req.body); // Crear una nueva instancia del modelo de servicios con los datos del cuerpo de la solicitud
    await service.save(); // Guardar el servicio en la base de datos

    return res.status(201).json({
      msg: "Servicio creado correctamente",
    }); // Devolver una respuesta exitosa con el servicio creado
  } catch (error) {
    return res.status(500).json({
      msg: "Error al crear el servicio",
      details: error.message, 
    });
  }
};

/**********************************************************************************************************************************************************/
const getServices = async (req, res) => {
  // Obtener todos los servicios de belleza de la base de datos
  try {
    const services = await Services.find(); // Buscar todos los servicios en la base de datos
    return res.json(services); // Devolver los servicios encontrados
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener los servicios",
      details: error.message, 
    });
  }
};

/**********************************************************************************************************************************************************/
const getServiceById = async (req, res) => {
  const { id } = req.params; // Obtener el ID del servicio de los parámetros de la solicitud

  // Validar un object ID
  // Si el ID no es válido, se retorna un error y se detiene la ejecución
  if (isValidObjectId(id, res)) return;

  try {
    const service = await Services.findById(id); // Buscar el servicio por ID en la base de datos

    // Validar si el servicio existe
    if (isServiceExists(service, res)) return;

    return res.json(service); // Devolver el servicio encontrado
  } catch (error) {
    return res.status(500).json({
      msg: "Error al obtener el servicio",
      details: error.message,
    });
  }
};

/**********************************************************************************************************************************************************/
const updateService = async (req, res) => {
  const { id } = req.params; // Obtener el ID del servicio de los parámetros de la solicitud

  // Validar un object ID
  // Si el ID no es válido, se retorna un error y se detiene la ejecución
  if (isValidObjectId(id, res)) return;

  // Validar que no haya campos vacíos
  if (validateFields(req, res)) return;

  try {
    // Actualizar el servicio por ID en la base de datos
    // Utiliza el método `findByIdAndUpdate` de Mongoose, que busca un documento por su ID y lo actualiza con los datos recibidos.
    const service = await Services.findByIdAndUpdate(id, req.body, {
      new: true, // retorna el documento actualizado en lugar del original.
      runValidators: true, // aplica las validaciones del esquema al actualizar.
    }); // Actualizar el servicio por ID en la base de datos

    // Validar si el servicio existe
    if (isServiceExists(service, res)) return;

    return res.json(service); // Devolver el servicio actualizado
  } catch (error) {
    return res.status(500).json({
      msg: "Error al actualizar el servicio",
      details: error.message,
    });
  }
};

/**********************************************************************************************************************************************************/
const deleteService = async (req, res) => {
  const { id } = req.params; // Obtener el ID del servicio de los parámetros de la solicitud
  // Validar un object ID
  if (isValidObjectId(id, res)) return;

  try {
    // Eliminar el servicio por ID en la base de datos
    const service = await Services.findByIdAndDelete(id); // Eliminar el servicio por ID en la base de datos
    // Validar si el servicio existe
    if (isServiceExists(service, res)) return;

    return res.json({
      msg: "Servicio eliminado correctamente",
    }); // Devolver una respuesta exitosa indicando que el servicio fue eliminado
  } catch (error) {
    return res.status(500).json({
      msg: "Error al eliminar el servicio",
      details: error.message,
    });
  }
};

// Exportar las funciones del controlador de servicios
export {
  createServices,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
