import { defineStore } from 'pinia'
import AuthApi from '@/api/AuthApi.ts'
import type { User } from '@/interface/User.ts'
import type { toastMessage } from '@/interface/ToastMessage.ts'

export const useAuthStore = defineStore('auth', () => {
  const register = async (userData: User): Promise<toastMessage> => {
    try {
      const { data } = await AuthApi.register(userData)

      return {
        message: data.msg || 'Usuario registrado correctamente, verifica tu correo electrónico',
        type: 'success',
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        return {
          message: err.response?.data?.msg || 'Error desconocido durante el registro',
          type: 'error',
        }
      }
      return { message: 'Error desconocido durante el registro', type: 'error' }
    }
  }

  const verifyAccount = async (token: string): Promise<toastMessage> => {
    try {
      const { data } = await AuthApi.verifyAccount(token)
      return {
        message: data.msg || 'Cuenta verificada correctamente',
        type: 'success',
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }   
        return {
          message: err.response?.data?.msg || 'Error desconocido durante la verificación de la cuenta',
          type: 'error',
        }
      }
      return { message: 'Error desconocido durante la verificación de la cuenta', type: 'error' }
    }
  }

  const login = async (userData: User): Promise<toastMessage> => {
    try {
      const { data } = await AuthApi.login(userData)
      
      // Guardar el token en localStorage
      localStorage.setItem('token', data.token)

      return {
        message: data.msg || 'Inicio de sesión exitoso',
        type: 'success',
      }
    }
    catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { msg?: string } } }
        return {
          message: err.response?.data?.msg || 'Error desconocido durante el inicio de sesión',
          type: 'error',
        }
      }
      return { message: 'Error desconocido durante el inicio de sesión', type: 'error' }
    }   
  }

  return {
    register,
    verifyAccount,
    login,
  }
})
