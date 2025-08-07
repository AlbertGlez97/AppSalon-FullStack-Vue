import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthApi from '@/api/AuthApi'
import AppointmentAPI from '@/api/AppointmentAPI'
import type { User } from '@/interface/User.ts'
import type { UserAppointment } from '@/interface/UserAppointment.ts'
import type { Toast } from '@/interface/Toast'

export const useUserStore = defineStore('user', () => {
  // Inyectamos el objeto $toast para mostrar notificaciones
  const $toast = inject<Toast>('$toast')
  // Usamos useRouter para redirigir al usuario después de cerrar sesión
  const router = useRouter()

  const user = ref<User>()
  const userAppointments = ref<UserAppointment[]>([])
  const userPastAppointments = ref<UserAppointment[]>([])
  const loading = ref<boolean>(true)

  async function getUser() {
    try {
      const { data } = await AuthApi.auth()
      user.value = data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener el usuario',
            type: 'error',
          })
        }
      }
    }
  }

  async function getUserAdmin() {
    try {
      const { data } = await AuthApi.admin()
      user.value = data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener el usuario administrador',
            type: 'error',
          })
        }
      }
    }
  }

  async function getAdminAppointmentsPending() {
    loading.value = true
    if (!user.value?._id) return

    try {
      const { data } = await AppointmentAPI.getAdminAppointmentsPending(user.value?._id)
      userAppointments.value = data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener las citas del usuario administrador',
            type: 'error',
          })
        }
      }
    } finally {
      loading.value = false
    }
  }


  async function getUserAppointments() {

    if (!user.value?._id) return

    try {
      const { data } = await AppointmentAPI.getUserAppointments(user.value?._id)
      userAppointments.value = data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener las citas del usuario',
            type: 'error',
          })
        }
      }
    } finally {
      loading.value = false
    }
  }

  async function getUserPastAppointments() {
    try {
      const { data } = await AppointmentAPI.getUserPastAppointments(user.value?._id || '')
      userPastAppointments.value = data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        if ($toast) {
          $toast.open({
            message: err.response?.data?.msg || 'Error al obtener las citas pasadas del usuario',
            type: 'error',
          })
        }
      }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    user.value = undefined
    router.push({ name: 'login' })
  }

  const getUserName = computed((): string => {
    return user.value ? user.value.name : ''
  })

  const noAppointments = computed((): boolean => {
    return userAppointments.value.length === 0
  })

  const noPastAppointments = computed((): boolean => {
    return userPastAppointments.value.length === 0
  })

  return {
    user,
    userAppointments,
    userPastAppointments,
    loading,
    getUser,
    getUserAdmin,
    getAdminAppointmentsPending,
    getUserAppointments,
    getUserPastAppointments,
    logout,
    getUserName,
    noAppointments,
    noPastAppointments,
  }
})
