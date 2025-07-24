<script setup lang="ts">
import { inject } from 'vue'
import { reset } from '@formkit/vue'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/interface/User'
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')

// Importamos el store de autenticación para manejar el registro de usuarios
const authStore = useAuthStore()

// Esta función handleSubmit recibe un objeto que contiene todos los datos del usuario para el registro,
// incluyendo una propiedad 'password_confirm' (confirmación de contraseña) y el resto de las propiedades
// definidas en el tipo 'User'. Utiliza desestructuración para separar 'password_confirm' del resto de los datos,
// permitiendo así validar que la contraseña y su confirmación coincidan antes de enviar los datos del usuario
// al backend o realizar otras acciones relacionadas con el registro.
const handleSubmit = async ({
  password_confirm,
  ...dataUser
}: { password_confirm: string } & User) => {
  try {
    const { message, type } = await authStore.register(dataUser)
    if ($toast) {
      $toast.open({ message: message, type: type })
    }

    if (type === 'success') {
      reset('register-form')
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
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crear una cuenta AppSalón</p>

  <FormKit
    id="register-form"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los campos"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre debe tener al menos 3 caracteres',
      }"
      prefix-icon="people"
    ></FormKit>

    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Tu email"
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
      placeholder="Tu contraseña"
      validation="required|length:8"
      :validation-messages="{
        required: 'La contraseña es obligatoria',
        length: 'La contraseña debe tener al menos 8 caracteres',
      }"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    ></FormKit>

    <FormKit
      type="password"
      label="Repetir Contraseña"
      name="password_confirm"
      placeholder="Repite tu contraseña"
      validation="required|length:8|confirm"
      :validation-messages="{
        required: 'La confirmación de contraseña es obligatoria',
        length: 'La confirmación debe tener al menos 8 caracteres',
        confirm: 'Las contraseñas no coinciden',
      }"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      @suffix-icon-click="handleIconClick"
    ></FormKit>

    <FormKit type="submit">Crear Cuenta</FormKit>
  </FormKit>
</template>
