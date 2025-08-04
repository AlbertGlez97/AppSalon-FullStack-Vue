<script setup lang="ts">
import { onMounted, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reset } from '@formkit/vue'
import AuthApi from '@/api/AuthApi'
import type { Toast } from '@/interface/Toast'

// Inyectamos el objeto $toast para mostrar notificaciones
const $toast = inject<Toast>('$toast')
const route = useRoute()
const router = useRouter()
const { token } = route.params as { token: string }

const validToken = ref<boolean>(false)

onMounted(async () => {
  if (!token) return

  try {
    // Verificamos si el token es válido
    const { data } = await AuthApi.verifyPasswordResetToken(token)
    validToken.value = true
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
})

const handleSubmit = async ({ password }: { password: string }) => {
  if (!password) return

  try {
    const { data } = await AuthApi.updatePassword(token, { password })

    if ($toast) {
      $toast.open({
        message: data.msg || 'Password modificado correctamente',
        type: 'success',
      })
    }

    reset('newPasswordForm')

    setTimeout(() => {
      router.push({ name: 'login' })
    }, 3000)
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { data?: { msg?: string } } }
      if ($toast) {
        $toast.open({
          message: err.response?.data?.msg || 'Error al cambiar el password',
          type: 'error',
        })
      }
    }
  }
}

const handleIconClick = (node: any, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const preventClipboard = (e: ClipboardEvent): void => {
  e.preventDefault()
}

const preventContextMenu = (e: MouseEvent): void => {
  e.preventDefault()
}
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nuevo Password</h1>
    <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>

    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los campos"
      @submit="handleSubmit"
    >
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
      />

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
        :input-attributes="{
          oncopy: preventClipboard,
          onpaste: preventClipboard,
          oncut: preventClipboard,
          oncontextmenu: preventContextMenu,
        }"
      />

      <FormKit type="submit">Guardar Password</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
</template>
