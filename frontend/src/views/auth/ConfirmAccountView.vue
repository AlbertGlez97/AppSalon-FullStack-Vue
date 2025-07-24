<script setup lang="ts">
import { inject } from 'vue'
import { onMounted } from 'vue';
import { useRoute , useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const {token} = route.params;

onMounted(async () => {
  
  try {
    const { message, type } = await authStore.verifyAccount(token as string);
    if ($toast) {
      $toast.open({ message: message, type: type })
    }
    // Si la verificación es exitosa, redirigimos al usuario a la página de inicio de sesión
    if (type === 'success') {
      // Redirigir al usuario a la página de inicio de sesión o donde sea apropiado
      router.push({ name: 'login' });
    }

  } catch (error) {
    if ($toast) {
      $toast.open({ message: error as string, type: 'error' })
    }
  }

});
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verificar cuenta</h1>
</template>