<script setup lang="ts">
import { inject } from 'vue'
import { reset } from '@formkit/vue'
import AuthApi from '@/api/AuthApi'
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')

const handleSubmit = async ({ email }: { email: string }) => {
  try {
    const { data } = await AuthApi.forgotPassword({email})

    if ($toast) {
      $toast.open({
        message: data.msg || 'Hemos enviado un email con las instrucciones',
        type: 'success',
      })
    }

    reset('forgotPassword')
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { msg?: string } } }
      if ($toast) {
        $toast.open({
          message: err.response?.data?.msg || 'Error al enviar el email con las instrucciones',
          type: 'error',
        })
      }
    }
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
  <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

  <FormKit
    id="forgotPassword"
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

    <FormKit type="submit">Enviar Instrucciones</FormKit>
  </FormKit>
</template>
