import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import api from '../lib/axios'
import type { User } from '@/interface/User'

export default {
  register(userData: User) {
    return api.post('/auth/register', userData)
  },
  verifyAccount(token: string) {
    return api.get(`/auth/verify/${token}`)
  },
  login(userData: User) {
    return api.post('/auth/login', userData)
  },
  auth() {
    return api.get('/auth/user')
  },
  admin() {
    return api.get('/auth/admin')
  },
  forgotPassword(data: {}) {
    return api.post('/auth/forgot-password', data)
  },
  verifyPasswordResetToken(token: string) {
    return api.get(`/auth/forgot-password/${token}`)
  },
  updatePassword(token: string,data: {}){
    return api.post(`/auth/forgot-password/${token}`, data)
  }
}
