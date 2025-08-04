<script setup lang="ts">
import type { UserAppointment } from '@/interface/UserAppointment.ts'
import { formatCurrency } from '@/helpers'
import { displayDate } from '@/helpers/date'
import { RouterLink } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments'

const appointmentsStore  = useAppointmentsStore()

defineProps<{
  appointment: UserAppointment
  isPastAppointment: boolean
}>()
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha: <span class="font-light">{{ displayDate(appointment.date) }}</span> Hora:
      <span class="font-light">{{ appointment.time }}</span>
    </p>

    <p class="text-lg font-black">Servicios Solicitados en la Cita:</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <p class="text-2xl font-black text-right">
      Total a pagar:
      <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
    </p>

    <div v-if="!isPastAppointment" class="flex gap-2 items-center">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
        class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
      >
        Editar Cita
      </RouterLink>
      <button
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointmentsStore.cancelAppointment(appointment._id)"
      >
        Cancelar Cita
      </button>
    </div>
  </div>
</template>
