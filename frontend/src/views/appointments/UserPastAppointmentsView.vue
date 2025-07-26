<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Appointment from '@/components/Appointment.vue';

const userStore = useUserStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas Pasadas</h2>
  <p class="text-white text-lg mt-5">A continuacion podras visualizar tus citas pasadas</p>

  <p v-if="userStore.loading">Cargando citas...</p>

  <div v-else class="">
    <p v-if="userStore.noPastAppointments" class="text-white text-2xl text-center mt-5">No tienes citas pasadas</p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <Appointment
        v-for="appointment in userStore.userPastAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
