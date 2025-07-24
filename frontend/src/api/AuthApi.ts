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
  auth(){

    const token = localStorage.getItem('token')

    return api.get('/auth/user',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}