import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthApi from '@/api/AuthApi'
import AppointmentAPI from '@/api/AppointmentAPI'
import type { User } from '@/interface/User.ts'
import type { UserAppointment } from '@/interface/UserAppointment.ts'

export const useUserStore = defineStore('user', () => {
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
      console.error(error)
    }
  }

  async function getUserAppointments() {
    try {
      const { data } = await AppointmentAPI.getUserAppointments(user.value?._id || '')
      userAppointments.value = data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getUserPastAppointments() {
    try {
      const { data } = await AppointmentAPI.getUserPastAppointments(user.value?._id || '')
      userPastAppointments.value = data
    } catch (error) {
      console.error(error)
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
    getUserAppointments,
    getUserPastAppointments,
    logout,
    getUserName,
    noAppointments,
    noPastAppointments,
  }
})
