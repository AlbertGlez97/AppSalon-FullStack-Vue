import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { cleanupExpiredTokens } from '../utils/index.js';

// Cargar variables de entorno
dotenv.config();

const cleanup = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conectado a MongoDB');
    
    // Limpiar tokens expirados
    const cleanedCount = await cleanupExpiredTokens();
    console.log(`Limpieza completada. ${cleanedCount} tokens expirados fueron limpiados.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error durante la limpieza:', error);
    process.exit(1);
  }
};

cleanup(); 