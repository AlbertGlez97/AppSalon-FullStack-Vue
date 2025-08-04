import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';

// Cargar variables de entorno
dotenv.config();

const setupTTL = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conectado a MongoDB');
    
    // Obtener la colección de usuarios
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Verificar si el índice TTL ya existe
    const indexes = await usersCollection.indexes();
    const ttlIndex = indexes.find(index => 
      index.key && index.key.tokenExpires && index.expireAfterSeconds !== undefined
    );
    
    if (ttlIndex) {
      console.log('Índice TTL ya existe:', ttlIndex);
    } else {
      console.log('Creando índice TTL...');
      
      // Crear el índice TTL
      await usersCollection.createIndex(
        { tokenExpires: 1 }, 
        { expireAfterSeconds: 0 }
      );
      
      console.log('Índice TTL creado exitosamente');
    }
    
    // Mostrar todos los índices
    console.log('\nÍndices actuales:');
    const allIndexes = await usersCollection.indexes();
    allIndexes.forEach((index, i) => {
      console.log(`${i + 1}. ${JSON.stringify(index)}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error configurando TTL:', error);
    process.exit(1);
  }
};

setupTTL(); 