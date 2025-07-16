import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Service } from '@/interface/Service.ts'

export const useAppointmentsStore = defineStore('appointments', () => {
  const services = ref<Service[]>([])

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

  // Computed property que retorna una función. Esta función recibe un id y verifica si existe un servicio con ese id en el array 'services'.
  // No se pasa el id como parámetro de 'computed' porque 'computed' está diseñado para crear propiedades reactivas basadas en dependencias,
  // pero aquí se necesita una función reutilizable que reciba diferentes ids y haga la comprobación bajo demanda.
  // Así, 'isServiceSelected.value' será una función que puedes llamar con cualquier id para saber si ese servicio está seleccionado.
  const isServiceSelected = computed(() => {
    return (id: string) => services.value.some((service) => service._id === id)
  })

  // Esta constante 'totalAmout' utiliza la función 'computed' de Vue.js para crear una propiedad computada reactiva.
  // Su propósito es calcular el monto total sumando los precios de todos los servicios seleccionados.
  // 'services.value' es una referencia reactiva (por ejemplo, un ref o reactive) que contiene un array de objetos de servicio.
  // El método 'reduce' recorre el array de servicios y acumula el valor de la propiedad 'price' de cada servicio.
  // El acumulador 'total' comienza en 0 y se le suma el precio de cada servicio en cada iteración.
  // El resultado final es el monto total de todos los servicios, que se actualiza automáticamente si 'services.value' cambia.
  const totalAmout = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const noServiceSelected = computed((): boolean => {
    return services.value.length === 0
  })

  return {
    services,
    onServiceSelected,
    isServiceSelected,
    totalAmout,
    noServiceSelected,
  }
})
