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
      services.value.push(service)
    }
  }

  const isServiceSelected = computed(() => {
    return (id: string) => services.value.some((service) => service._id === id)
  })

  return {
    onServiceSelected,
    isServiceSelected,
  }
})
