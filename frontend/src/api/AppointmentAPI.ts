import api from '../lib/axios'
import type { Appointment } from '../interface/Appointment'

export default {
  create(data: Appointment) {
    return api.post('/appointments', data)
  },
  getByDate(date: string) {
    return api.get(`/appointments?date=${date}`)
  },
  getAdminAppointmentsPending(userId: string) {
    return api.get(`/user/${userId}/appointments/pending`)
  },
  getUserAppointments(userId: string) {
    return api.get(`/user/${userId}/appointments`)
  },
  getUserPastAppointments(userId: string) {
    return api.get(`/user/${userId}/appointments/past`)
  },
  getById(id: string) {
    return api.get(`/appointments/${id}`)
  },
  update(id: string, data: Appointment) {
    return api.put(`/appointments/${id}`, data)
  },
  delete(id: string) {
    return api.delete(`/appointments/${id}`)
  },
}
