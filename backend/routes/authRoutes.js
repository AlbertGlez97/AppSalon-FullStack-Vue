import express from 'express';
import { register, verifyAccount, login } from '../controllers/authController.js'; // Importar el controlador de autenticación

const router = express.Router();

// Rutas de autenticación y registro de usuarios

router.post('/register', register) // Ruta para registrar un nuevo usuario
router.get('/verify/:token', verifyAccount); // Ruta para verificar el token de un usuario
router.post('/login', login); // Ruta para iniciar sesión


export default router;