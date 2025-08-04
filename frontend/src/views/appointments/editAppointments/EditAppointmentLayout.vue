<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI'
import { useAppointmentsStore } from '@/stores/appointments'
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')

const appointmentsStore = useAppointmentsStore()
const route = useRoute()
const router = useRouter()

const id = route.params.id as string | undefined

onMounted(async () => {
  if (!id) return

  try {
    const { data } = await AppointmentAPI.getById(id)

    appointmentsStore.setSelectedAppointment(data)
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { msg?: string } } }
      if ($toast) {
        $toast.open({
          message: err.response?.data?.msg || 'Error al obtener la cita',
          type: 'error',
        })
      }
    }
    router.push({ name: 'user-appointments' })
  }
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="
        route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
      "
    >
      Servicios</RouterLink
    >
    <RouterLink
      :to="{ name: 'edit-appointment-details' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="
        route.name === 'edit-appointment-details'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-500'
      "
    >
      Cita y Resumen
    </RouterLink>
  </nav>

  <div class="space-y-5">
    <RouterView />
  </div>
</template>
