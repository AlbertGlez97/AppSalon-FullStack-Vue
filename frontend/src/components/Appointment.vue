<script setup lang="ts">
import type { UserAppointment } from '@/interface/UserAppointment.ts';

defineProps<{
  appointment: UserAppointment
}>()

</script>

<template>

    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Fecha: <span class="font-light">{{ appointment.date }}</span>
            Hora: <span class="font-light">{{ appointment.time }}</span>
        </p>
    </div>

</template>

