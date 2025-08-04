import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";
import {
  sendEmailNewAppointment,
  sendEmailUpdateAppointment,
  sendEmailDeleteAppointment,
} from "../emails/appointmentEmailService.js";
import { isValidObjectId, formatDate } from "../utils/index.js";

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

    const result = await appointment.save();

    await sendEmailNewAppointment({
      date: formatDate(result.date),
      time: result.time,
    });

    res.status(201).json({ message: "Cita Almacena Correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Fallo al Almacenar la Cita", details: error.message });
  }
};

const getAppointmentsByDate = async (req, res) => {
  try {
    // Extrae el parámetro 'date' de la consulta de la petición HTTP
    const { date } = req.query;
    // Si no se proporciona una fecha, responde con error 400
    if (!date) {
      return res.status(400).json({ msg: "Fecha es requerida" });
    }

    // Convierte el string de fecha recibido a un objeto Date usando el formato dd/MM/yyyy
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());

    // Verifica si la fecha convertida es válida
    if (!isValid(parsedDate)) {
      return res.status(400).json({ msg: "Fecha inválida" });
    }

    // Formatea la fecha a una cadena ISO para mantener consistencia
    const isoDate = formatISO(parsedDate);

    // Busca las citas en la base de datos cuyo campo 'date' esté dentro del día especificado
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)), // Desde el inicio del día
        $lte: endOfDay(new Date(isoDate)), // Hasta el final del día
      },
    }).select("time"); // Solo selecciona el campo 'time' de cada cita

    // Devuelve las citas encontradas con código 200
    res.status(200).json(appointments);
  } catch (error) {
    // Si ocurre un error, responde con código 500 y detalles del error
    res
      .status(500)
      .json({ msg: "Fallo al Obtener las Citas", details: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  // Validar por object id
  if (isValidObjectId(id, res)) return;

  // Validar que exista
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return res.status(404).json({ msg: "Cita no encontrada" });

  if (
    req?.user?._id.toString() &&
    appointment.user.toString() !== req.user._id.toString()
  ) {
    const error = new Error("No tienes permiso para realizar esta acción");
    return res.status(403).json({ msg: error.message });
  }

  //Retornar la cita
  res.status(200).json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  // Validar por object id
  if (isValidObjectId(id, res)) return;

  // Validar que exista
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return res.status(404).json({ msg: "Cita no encontrada" });

  if (
    req?.user?._id.toString() &&
    appointment.user.toString() !== req.user._id.toString()
  ) {
    const error = new Error("No tienes permiso para realizar esta acción");
    return res.status(403).json({ msg: error.message });
  }

  // Actualizar
  const { date, time, totalAmount, services } = req.body;
  appointment.date = date;
  appointment.time = time;
  appointment.totalAmount = totalAmount;
  appointment.services = services;

  try {
    const result = await appointment.save();

    await sendEmailUpdateAppointment({
      date: formatDate(result.date),
      time: result.time,
    });

    res.status(200).json({ msg: "Cita Actualizada Correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al actualizar la cita", details: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  // Validar por object id
  if (isValidObjectId(id, res)) return;

  // Validar que exista
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return res.status(404).json({ msg: "Cita no encontrada" });

  if (
    req?.user?._id.toString() &&
    appointment.user.toString() !== req.user._id.toString()
  ) {
    const error = new Error("No tienes permiso para realizar esta acción");
    return res.status(403).json({ msg: error.message });
  }

  // Eliminar
  try {
    const result = await appointment.deleteOne();

    await sendEmailDeleteAppointment({
      date: formatDate(appointment.date),
      time: appointment?.time || "",
    });

    res.status(200).json({ msg: "Cita Cancelada Exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al cancelar la cita", details: error.message });
  }
};

export {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
