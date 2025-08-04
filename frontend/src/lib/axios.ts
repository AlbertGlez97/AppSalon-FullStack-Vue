import axios from 'axios' // Importa la librería axios para hacer solicitudes HTTP.
import { useRouter } from 'vue-router'

// Un interceptor es una función que permite modificar o manejar las solicitudes o respuestas antes de que lleguen al servidor o al cliente.
// Por ejemplo, se puede usar para agregar encabezados, manejar errores globales, o registrar información de las solicitudes.

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Configura la URL base para todas las solicitudes HTTP.
})

api.interceptors.request.use((config) => { // Agrega un interceptor de solicitud (request).
  // Este interceptor se ejecuta antes de enviar cada solicitud.
  const token = localStorage.getItem('token') // Obtiene el token de autenticación del almacenamiento local.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}` // Si hay token, lo agrega al encabezado Authorization.
  }
  return config // Devuelve la configuración modificada de la solicitud.
}, (error) => {
  return Promise.reject(error) // Si ocurre un error, rechaza la promesa y lo pasa al manejador de errores.
})

// Interceptor de respuesta para manejar tokens expirados
api.interceptors.response.use(
  (response) => {
    return response // Si la respuesta es exitosa, la devuelve tal como está.
  },
  (error) => {
    // Si el error es de autenticación (401) y el token está expirado
    if (error.response?.status === 401 && error.response?.data?.expired) {
      // Limpiar el token del localStorage
      localStorage.removeItem('token')
      
      // Redirigir al login
      window.location.href = '/auth/login'
      
      return Promise.reject(error)
    }
    
    return Promise.reject(error) // Para otros errores, los rechaza normalmente.
  }
)

export default api // Exporta la instancia de axios configurada para usarla en otras partes de la aplicación.
