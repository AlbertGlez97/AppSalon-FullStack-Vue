import express from "express";
import {
  createServices,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/servicesController.js"; // Importar el controlador de servicios

const router = express.Router();

// Definir las rutas para los servicios
router.route("/")
    .get(getServices) // Definir la ruta para obtener todos los servicios
    .post(createServices); // Definir la ruta para crear un nuevo servicio

// Definir las rutas para un servicio específico por ID
// El ID se obtiene de los parámetros de la solicitud
router.route("/:id")
    .get(getServiceById) // Definir la ruta para obtener un servicio específico por ID
    .patch(updateService) // Definir la ruta para actualizar un servicio específico por ID  
    .delete(deleteService); // Definir la ruta para eliminar un servicio específico por ID    

export default router;
