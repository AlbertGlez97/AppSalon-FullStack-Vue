import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserCurrentAppointments,
  getUserPastAppointments,
} from "../controllers/userController.js"; // Importar el controlador de usuario

const router = express.Router();

// Definir las rutas para el usuario aquí
router
  .route("/:user/appointments")
  .get(authMiddleware, getUserCurrentAppointments); // Obtener citas actuales del usuario

router
  .route("/:user/appointments/past")
  .get(authMiddleware, getUserPastAppointments); // Obtener citas pasadas del usuario

export default router;
