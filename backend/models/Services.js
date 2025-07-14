import mongoose from "mongoose";

// Definir el esquema para el modelo de servicios
// Un esquema en Mongoose es una estructura que describe cómo deben ser los documentos dentro de una colección de MongoDB.
// En este caso, el esquema define que cada servicio tendrá un nombre (name) y un precio (price).
// El campo name es de tipo String, es requerido y se le aplica un trim para eliminar espacios en blanco al inicio y al final.
// El campo price es de tipo Number y también es requerido. 
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Crear el modelo de servicios a partir del esquema definido
// Un modelo en Mongoose es una clase que se utiliza para crear y manipular documentos de una colección en MongoDB.
// Aquí, el modelo se llama "Services" y se basa en el esquema serviceSchema.   
const Service = mongoose.model("Services", serviceSchema);
export default Service;