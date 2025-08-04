import { startOfDay } from "date-fns";
import Appointment from "../models/Appointment.js"; // Importar el modelo de citas

const getUserCurrentAppointments = async (req, res) => {
  const { user } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const appointments = await Appointment.find({
      user,
      date: { $gte: startOfDay(new Date()) },
    })
      .populate("services")
      .sort({ date: "asc", time: "asc" }); // Buscar citas del usuario con fecha mayor o igual a la fecha actual , populate sirve para incluir los detalles de los servicios relacionados con la cita

    if (!appointments.length) {
      const error = new Error("No se encontraron citas para este usuario");

      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(appointments); // Devolver las citas encontradas
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las citas del usuario" });
  }
};

const getUserPastAppointments = async (req, res) => {
  const { user } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const appointments = await Appointment.find({
      user,
      date: { $lt: startOfDay(new Date()) },
    })
      .populate("services")
      .sort({ date: "desc", time: "desc" }); // Buscar citas del usuario con fecha anterior a la fecha actual , populate sirve para incluir los detalles de los servicios relacionados con la cita

    if (!appointments.length) {
      const error = new Error(
        "No se encontraron citas pasadas para este usuario"
      );

      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(appointments); // Devolver las citas pasadas encontradas
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al obtener las citas pasadas del usuario" });
  }
};

export { getUserCurrentAppointments, getUserPastAppointments }; // Exportar las funciones para que puedan ser utilizadas en las rutas
