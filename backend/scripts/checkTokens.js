import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

// Cargar variables de entorno
dotenv.config();

const checkTokens = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conectado a MongoDB');
    
    // Buscar usuarios con tokens
    const usersWithTokens = await User.find({ 
      token: { $ne: null, $ne: '' } 
    }).select('name email token tokenExpires verified');
    
    console.log(`\n📊 Estado de tokens en la base de datos:`);
    console.log(`Total de usuarios con tokens: ${usersWithTokens.length}`);
    
    if (usersWithTokens.length > 0) {
      console.log('\n👥 Usuarios con tokens activos:');
      usersWithTokens.forEach((user, index) => {
        const timeLeft = user.tokenExpires ? 
          Math.max(0, Math.floor((user.tokenExpires - new Date()) / 1000 / 60)) : 
          'Sin fecha de expiración';
        
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Token: ${user.token}`);
        console.log(`   Expira: ${user.tokenExpires}`);
        console.log(`   Tiempo restante: ${timeLeft} minutos`);
        console.log(`   Verificado: ${user.verified ? 'Sí' : 'No'}`);
        console.log('');
      });
    } else {
      console.log('✅ No hay usuarios con tokens activos');
    }
    
    // Buscar usuarios sin verificar
    const unverifiedUsers = await User.find({ 
      verified: false,
      token: { $ne: null, $ne: '' }
    }).countDocuments();
    
    console.log(`📧 Usuarios sin verificar con tokens: ${unverifiedUsers}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error verificando tokens:', error);
    process.exit(1);
  }
};

checkTokens(); 