import express from 'express';
import { register, verifyAccount, login, user } from '../controllers/authController.js'; // Importar el controlador de autenticación
import authMiddleware from '../middleware/authMiddleware.js'; // Importar el middleware de autenticación

const router = express.Router();

// Rutas de autenticación y registro de usuarios

router.post('/register', register) // Ruta para registrar un nuevo usuario
router.get('/verify/:token', verifyAccount); // Ruta para verificar el token de un usuario
router.post('/login', login); // Ruta para iniciar sesión

// Area Privada - Requiere un JWT válido
router.get('/user', authMiddleware, user)

export default router;