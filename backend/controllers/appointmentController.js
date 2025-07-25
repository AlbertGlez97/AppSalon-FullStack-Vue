import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  try {
    // Logic to create an appointment
    const appointment = new Appointment({
      services: req.body.services,
      date: req.body.date,
      time: req.body.time,
      totalAmount: req.body.totalAmount,
      user: req.user.id,
    });

    await appointment.save();
    res.status(201).json({ message: "Cita Almacena Correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Fallo al Almacenar la Cita", details: error.message });
  }
};

const getAppointmentsByDate = async (req, res) => {
  try {
    // Extrae el parámetro 'date' de la consulta de la petición HTTP
    const { date } = req.query;
    // Si no se proporciona una fecha, responde con error 400
    if (!date) {
      return res.status(400).json({ error: "Fecha es requerida" });
    }

    // Convierte el string de fecha recibido a un objeto Date usando el formato dd/MM/yyyy
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());

    // Verifica si la fecha convertida es válida
    if (!isValid(parsedDate)) {
      return res.status(400).json({ error: "Fecha inválida" });
    }

    // Formatea la fecha a una cadena ISO para mantener consistencia
    const isoDate = formatISO(parsedDate);

    // Busca las citas en la base de datos cuyo campo 'date' esté dentro del día especificado
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)), // Desde el inicio del día
        $lte: endOfDay(new Date(isoDate)),   // Hasta el final del día
      },
    }).select("time"); // Solo selecciona el campo 'time' de cada cita

    // Devuelve las citas encontradas con código 200
    res.status(200).json(appointments);
  } catch (error) {
    // Si ocurre un error, responde con código 500 y detalles del error
    res
      .status(500)
      .json({ error: "Fallo al Obtener las Citas", details: error.message });
  }
};

export { createAppointment, getAppointmentsByDate };
