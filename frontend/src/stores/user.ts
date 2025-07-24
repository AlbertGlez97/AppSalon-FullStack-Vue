import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthApi from '@/api/AuthApi'
import type { User } from '@/interface/User.ts'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref<User>()

  onMounted(async () => {
    try {
      const { data } = await AuthApi.auth()
      user.value = data
    } catch (error) {
      console.error(error)
    }
  })

  function logout() {
    localStorage.removeItem('token')
    user.value = undefined
    router.push({ name: 'login' })
  }

  const getUserName = computed(() => {
    return user.value ? user.value.name : ''
  })

  return {
    user,
    logout,
    getUserName,
  }
})
