<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()

onMounted(() => {
  userStore.getUser()
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'user-appointments' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="
        route.name === 'user-appointments' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
      "
      @click.native="userStore.getUserAppointments"
    >
      Citas</RouterLink
    >
    <RouterLink
      :to="{ name: 'user-past-appointments' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="
        route.name === 'user-past-appointments'
          ? 'bg-blue-500 text-white'
          : 'bg-white text-blue-500'
      "
      @click.native="userStore.getUserPastAppointments"
    >
      Citas Pasadas</RouterLink
    >
  </nav>

  <div class="space-y-5">
    <RouterView />
  </div>
</template>
