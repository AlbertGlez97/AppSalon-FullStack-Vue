<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import Appointment from '@/components/Appointment.vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUserAppointments()
})

</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas Próximas</h2>
  <p class="text-white text-lg mt-5">A continuacion podras administrar tus proximas citas</p>

  <p v-if="userStore.loading">Cargando citas...</p>

  <div v-else class="">
    <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">No tienes citas próximas</p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <Appointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
        :isPastAppointment="false"
        />
    </div>

  </div>

</template>
