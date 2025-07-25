<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectedServices from '@/components/SelectedServices.vue'
import { formatCurrency } from '@/helpers'
import { useAppointmentsStore } from '@/stores/appointments'

const storeAppointments = useAppointmentsStore()

// Fecha actual para limitar fechas anteriores
const today = new Date()

// Limitar que puedan agrear citas un mes después
const maxDate = new Date()
maxDate.setMonth(maxDate.getMonth() + 1)

// Esta es la fecha seleccionada por el usuario en formato Date
const selectedDate = ref<Date | null>(null)

// Función para formatear la fecha al estilo mexicano
const formatDateToMexican = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0') // día con ceros iniciales
  const month = String(date.getMonth() + 1).padStart(2, '0') // mes con ceros iniciales
  const year = date.getFullYear()

  return `${day}/${month}/${year}` // ejemplo: "16/07/2025"
}

// Observador que actualiza el store al cambiar la fecha
watch(selectedDate, (newDate) => {
  if (newDate) {
    const formatted = formatDateToMexican(newDate)
    storeAppointments.date = formatted
  } else {
    storeAppointments.date = ''
  }
})
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">Deatlles Cita y Resumen</h2>
  <p class="text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>
  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

  <p v-if="storeAppointments.noServiceSelected" class="text-white text-2xl text-center">
    No hay servicios seleccionados
  </p>

  <div v-else class="grid gap-5">
    <SelectedServices
      v-for="service in storeAppointments.services"
      :key="service._id"
      :service="service"
    />

    <p class="text-right text-white text-2xl">
      Total a pagar:
      <span class="font-bold">
        {{ formatCurrency(storeAppointments.totalAmount) }}
      </span>
    </p>
  </div>

  <div v-if="!storeAppointments.noServiceSelected" class="space-y-8">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="">
        <VueDatePicker
          :inline="{ input: false }"
          :enable-time-picker="false"
          auto-apply
          locale="es-MX"
          v-model="selectedDate"
          :min-date="today"
          :max-date="maxDate"
          :disabled-week-days="[0]"
        />
      </div>
      <div
        v-if="storeAppointments.isDateSelected"
        class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3 mt-10 lg:mt-0"
      >
        <button
          v-for="hour in storeAppointments.hours"
          :key="hour"
          class="block text-blue-500 rounded-lg text-xl font-black p-2 disabled:opacity-10"
          :class="[
            storeAppointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white',
            storeAppointments.disableTime(hour) ? 'cursor-not-allowed' : 'cursor-pointer',
          ]"
          @click="storeAppointments.time = hour"
          :disabled="storeAppointments.disableTime(hour)"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div v-if="storeAppointments.isValidReservation" class="flex justify-end">
      <button
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white cursor-pointer"
        @click="storeAppointments.createAppointment"
      >
        CONFIRMAR RESERVACIÓN
      </button>
    </div>
  </div>
</template>
