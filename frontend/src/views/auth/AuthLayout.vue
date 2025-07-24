<script setup lang="ts">
const authRoutes = [
  { name: 'register', text: 'Crear una Cuenta' },
  { name: 'login', text: 'Iniciar Sesión' },
]
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-20">
    <RouterView />

    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0"
    >
      <RouterLink
        v-for="authRoute in authRoutes"
        :to="{ name: authRoute.name }"
        class="uppercase font-bold text-white"
      >
        {{ authRoute.text }}
      </RouterLink>
    </nav>
  </div>
</template>
