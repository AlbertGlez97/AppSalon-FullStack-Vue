import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI'
import type { Service } from '@/interface/Service.ts'
import type { Appointment } from '@/interface/Appointment.ts'
import type { AppointmentByDate } from '@/interface/AppointmentByDate'
import type { Toast } from '@/interface/Toast'
import type { UserAppointment } from '@/interface/UserAppointment'
import { convertToISODate, convertToDDMMYYYY } from '@/helpers/date.ts'
import { useUserStore } from '@/stores/user.ts'

export const useAppointmentsStore = defineStore('appointments', () => {

  // Inyectamos el objeto $toast para mostrar notificaciones
  const $toast = inject<Toast>('$toast')
  const router = useRouter()
  const userStore = useUserStore()

  const appointmentId = ref<string | null>(null)
  const services = ref<Service[]>([]) // Servicios seleccionados
  const date = ref<string | null>(null) // Fecha seleccionada
  const hours = ref<string[]>([]) // Horas disponibles
  const time = ref<string | null>(null) // Hora seleccionada
  const appointmentsByDate = ref<AppointmentByDate[]>([]) // Citas del día seleccionado
  const selectedDate = ref<Date>(new Date()) // Inicializar con fecha actual en lugar de null

  onMounted(() => {
    const startHour = 10 // Hora de inicio
    const endHour = 19 // Hora de fin
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  watch(date, async () => {
    time.value = '' // Limpiar hora seleccionada al cambiar la fecha

    if (!date.value) return

    try {
      const { data } = await AppointmentAPI.getByDate(date.value)

      if (appointmentId.value) {
        // Si esta en modo Edicion, permitir al usuario escoger una fecha diferente o simplemente quedarse con su misma fecha
        appointmentsByDate.value = data.filter(
          (appointment: AppointmentByDate) => appointment._id !== appointmentId.value,
        )

        // Dejo marcado su fecha actual
        const appointmentTimeUser = data.filter(
          (appointment: AppointmentByDate) => appointment._id == appointmentId.value,
        )

        time.value = appointmentTimeUser ? appointmentTimeUser[0]?.time || '' : ''
      } else {
        // Actualiza appointmentsByDate con las horas disponibles
        appointmentsByDate.value = data
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener las horas disponibles',
            type: 'error',
          })
        }
      }
    }
  })

  function setSelectedAppointment(appointment: UserAppointment) {
    services.value = appointment.services
    selectedDate.value = new Date(appointment.date)
    time.value = appointment.time
    appointmentId.value = appointment._id
  }

  function onServiceSelected(service: Service) {
    if (services.value.some((selectedService) => selectedService._id === service._id)) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id,
      )
    } else {
      //Solo permitir seleccionar hasta 2 servicios
      if (services.value.length >= 2) {
        console.warn('Solo se pueden seleccionar hasta 2 servicios')
        return
      }

      services.value.push(service)
    }
  }

  async function saveAppointment() {
    if (isValidReservation.value) {
      const appointment: Appointment = {
        date: date.value ? convertToISODate(date.value) : '',
        time: time?.value || '',
        services: services.value.map((service) => service._id),
        totalAmount: totalAmount.value,
      }

      if (appointmentId.value) {
        try {
          const { data } = await AppointmentAPI.update(appointmentId.value, appointment)

          if ($toast) {
            $toast.open({
              message: data.msg || 'Cita actualiza exitosamente',
              type: 'success',
            })
          }
        } catch (error) {
          if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as { response?: { data?: { msg?: string } } }
            if ($toast) {
              $toast.open({
                message: err.response?.data?.msg || 'Error al actualizar la cita',
                type: 'error',
              })
            }
          }
        }
      } else {
        try {
          const { data } = await AppointmentAPI.create(appointment)

          if ($toast) {
            $toast.open({
              message: data.msg || 'Cita creada exitosamente',
              type: 'success',
            })
          }
        } catch (error) {
          if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as { response?: { data?: { msg?: string } } }
            if ($toast) {
              $toast.open({
                message: err.response?.data?.msg || 'Error al crear la cita',
                type: 'error',
              })
            }
          }
        }
      }

      // Redirigir a la página de citas del usuario
      await router.push({ name: 'user-appointments' })

      // Limpiar los campos después de crear la cita
      clearAppointmentData()
    } else {
      console.warn('Por favor, completa todos los campos requeridos')
    }
  }

  function clearAppointmentData() {
    services.value = []
    date.value = null
    time.value = null
    appointmentId.value = null
    selectedDate.value = new Date() // Resetear a fecha actual en lugar de null
  }

  async function cancelAppointment(id: string) {
    if (confirm('Deseas cancelar esta cita?')) {
      try {
        const { data } = await AppointmentAPI.delete(id)

        if ($toast) {
          $toast.open({
            message: data.msg || 'Cancelacion Exitosa',
            type: 'success',
          })
        }

        // Quitar la cita eliminada del array de citas del usuario
        userStore.userAppointments = userStore.userAppointments.filter(
          (appointment) => appointment._id !== id,
        )
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const err = error as { response?: { data?: { msg?: string } } }
          if ($toast) {
            $toast.open({
              message: err.response?.data?.msg || 'Error desconocido durante la cancelacion',
              type: 'error',
            })
          }
        }
      }
    }
  }

  // Computed property que retorna una función. Esta función recibe un id y verifica si existe un servicio con ese id en el array 'services'.
  // No se pasa el id como parámetro de 'computed' porque 'computed' está diseñado para crear propiedades reactivas basadas en dependencias,
  // pero aquí se necesita una función reutilizable que reciba diferentes ids y haga la comprobación bajo demanda.
  // Así, 'isServiceSelected.value' será una función que puedes llamar con cualquier id para saber si ese servicio está seleccionado.
  const isServiceSelected = computed(() => {
    return (id: string) => services.value.some((service) => service._id === id)
  })

  // Esta constante 'totalAmount' utiliza la función 'computed' de Vue.js para crear una propiedad computada reactiva.
  // Su propósito es calcular el monto total sumando los precios de todos los servicios seleccionados.
  // 'services.value' es una referencia reactiva (por ejemplo, un ref o reactive) que contiene un array de objetos de servicio.
  // El método 'reduce' recorre el array de servicios y acumula el valor de la propiedad 'price' de cada servicio.
  // El acumulador 'total' comienza en 0 y se le suma el precio de cada servicio en cada iteración.
  // El resultado final es el monto total de todos los servicios, que se actualiza automáticamente si 'services.value' cambia.
  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const noServiceSelected = computed((): boolean => {
    return services.value.length === 0
  })

  const isValidReservation = computed((): boolean => {
    return date.value !== '' && time.value !== '' && services.value.length > 0
  })

  const isDateSelected = computed((): boolean => {
    return date.value ? true : false
  })

  const disableTime = computed(() => {
    return (hour: string): boolean => {
      // Verifica si la hora está ocupada en las citas del día seleccionado
      return appointmentsByDate.value.find(
        (appointment: AppointmentByDate) => appointment.time === hour,
      )
        ? true
        : false
    }
  })

  return {
    appointmentId,
    services,
    date,
    hours,
    time,
    selectedDate,
    setSelectedAppointment,
    onServiceSelected,
    saveAppointment,
    clearAppointmentData,
    cancelAppointment,
    isServiceSelected,
    totalAmount,
    noServiceSelected,
    isValidReservation,
    isDateSelected,
    disableTime,
  }
})
