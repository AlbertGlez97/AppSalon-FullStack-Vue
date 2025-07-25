import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI'
import type { Service } from '@/interface/Service.ts'
import type { Appointment } from '@/interface/Appointment.ts'
import type { AppointmentByDate } from '@/interface/AppointmentByDate'
import type { Toast } from '@/interface/Toast'
import { convertToISODate } from '@/helpers/date.ts'

export const useAppointmentsStore = defineStore('appointments', () => {
  const services = ref<Service[]>([]) // Servicios seleccionados
  const date = ref<string>('') // Fecha seleccionada
  const hours = ref<string[]>([]) // Horas disponibles
  const time = ref<string>('') // Hora seleccionada
  const appointmentsByDate = ref<AppointmentByDate[]>([]) // Citas del día seleccionado

  // Inyectamos el objeto $toast para mostrar notificaciones
  const $toast = inject<Toast>('$toast')

  const router = useRouter()

  onMounted(() => {
    const startHour = 10 // Hora de inicio
    const endHour = 19 // Hora de fin
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  watch(date, async () => {

    time.value = '' // Limpiar hora seleccionada al cambiar la fecha

    if (!date.value) {
      appointmentsByDate.value = [] // Limpiar horas si no hay fecha seleccionada
      return
    }

    try {
      const { data } = await AppointmentAPI.getByDate(date.value)

      // Actualiza appointmentsByDate con las horas disponibles
      appointmentsByDate.value = data
    } catch (error) {
      if ($toast) {
        $toast.open({
          message: 'Error al obtener las horas disponibles',
          type: 'error',
        })
      }
    }
  })

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

  async function createAppointment() {
    if (isValidReservation.value) {
      const appointment: Appointment = {
        date: convertToISODate(date.value),
        time: time.value,
        services: services.value.map((service) => service._id),
        totalAmount: totalAmount.value,
      }

      try {
        await AppointmentAPI.create(appointment)

        if ($toast) {
          $toast.open({
            message: 'Cita creada exitosamente',
            type: 'success',
          })
        }

        // Redirigir a la página de citas del usuario
        await router.push({ name: 'my-appointments' })

        // Limpiar los campos después de crear la cita
        clearAppointmentData()
      } catch (error) {
        if ($toast) {
          $toast.open({
            message: 'Error al crear la cita',
            type: 'error',
          })
        }
      }
    } else {
      console.warn('Por favor, completa todos los campos requeridos')
    }
  }

  function clearAppointmentData() {
    services.value = []
    date.value = ''
    time.value = ''
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
    services,
    date,
    hours,
    time,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    totalAmount,
    noServiceSelected,
    isValidReservation,
    isDateSelected,
    disableTime,
  }
})
