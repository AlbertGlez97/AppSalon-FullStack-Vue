import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import { uniqueId } from '../utils/index.js';

// Cargar variables de entorno
dotenv.config();

const testTTL = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conectado a MongoDB');
    
    // Crear un usuario de prueba con token
    const testUser = new User({
      name: 'Test TTL User',
      email: `test-ttl-${Date.now()}@example.com`,
      password: 'password123',
      token: uniqueId(),
    });
    
    console.log('Guardando usuario de prueba...');
    await testUser.save();
    
    console.log('Usuario guardado:', {
      id: testUser._id,
      token: testUser.token,
      tokenExpires: testUser.tokenExpires
    });
    
    // Verificar que el usuario existe
    const foundUser = await User.findById(testUser._id);
    console.log('Usuario encontrado:', {
      id: foundUser._id,
      token: foundUser.token,
      tokenExpires: foundUser.tokenExpires
    });
    
    console.log('\n⏰ Esperando 16 minutos para que expire el token...');
    console.log('Puedes verificar en MongoDB que el documento se elimine automáticamente.');
    console.log('O ejecuta este script nuevamente para verificar si el usuario sigue existiendo.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error en prueba TTL:', error);
    process.exit(1);
  }
};

testTTL(); 