<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/interface/User'
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')

const router = useRouter()

// Importamos el store de autenticación para manejar el registro de usuarios
const authStore = useAuthStore()

const handleSubmit = async ({
  password_confirm,
  ...dataUser
}: { password_confirm: string } & User) => {
  try {
    const { message, type } = await authStore.login(dataUser)
    if ($toast) {
      $toast.open({ message: message, type: type })
    }

    // Redirigir al usuario a la vista de citas después de iniciar sesión
    if (type === 'success') {
      router.push({ name: 'my-appointments' })
    }
  } catch (error) {
    if ($toast) {
      $toast.open({ message: error as string, type: 'error' })
    }
  }
}

const handleIconClick = (node: any, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
  <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

  <FormKit
    id="login-form"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los campos"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de Usuario"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'El email debe ser válido',
      }"
      prefix-icon="email"
    ></FormKit>

    <FormKit
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Contraseña de Usuario"
      validation="required"
      :validation-messages="{
        required: 'La contraseña es obligatoria',
      }"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    ></FormKit>

    <FormKit type="submit">Iniciar Sesión</FormKit>
  </FormKit>
</template>
