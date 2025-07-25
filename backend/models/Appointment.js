import mongoose from "mongoose";

/**
 * appointmentSchema define la estructura de los documentos de citas en la base de datos.
 *
 * - services: Array de referencias a los servicios seleccionados para la cita. Cada elemento es un ObjectId que apunta al modelo "Services".
 * - date: Fecha de la cita.
 * - time: Hora de la cita (como cadena).
 * - totalAmount: Monto total a pagar por la cita.
 * - user: Referencia al usuario que reservó la cita, usando ObjectId que apunta al modelo "User".
 *
 * mongoose.Schema.Types.ObjectId es un tipo especial de identificador utilizado por MongoDB para referenciar documentos en otras colecciones. Permite establecer relaciones entre diferentes modelos en la base de datos.
 */
const appointmentSchema = new mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
