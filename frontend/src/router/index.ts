import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import AuthApi from '@/api/AuthApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayoutView.vue'),
      meta: {
        requiresAdmin: true, // Requiere ser administrador
      },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AppointmentsView.vue'),
        },
      ],
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: {
        requiresAuth: true, // Requiere autenticación para acceder a las citas
      },
      children: [
        {
          path: 'my-appointments',
          component: () => import('../views/appointments/myAppointments/MyAppointmentsLayout.vue'),
          children: [
            {
              path: '',
              name: 'user-appointments',
              component: () =>
                import('../views/appointments/myAppointments/UserAppointmentsView.vue'),
            },
            {
              path: 'pasadas',
              name: 'user-past-appointments',
              component: () =>
                import('../views/appointments/myAppointments/UserPastAppointmentsView.vue'),
            },
          ],
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentDetailsView.vue'),
            },
          ],
        },
        {
          path: ':id/editar',
          component: () =>
            import('../views/appointments/editAppointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/AppointmentDetailsView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Verificar si el usuario tiene un token de autenticación
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      next({ name: 'login' })
    } else {
      try {
        const { data } = await AuthApi.auth()

        if (data.admin) {
          next({ name: 'admin' })
        } else {
          // Si la autenticación es exitosa, continuar a la ruta solicitada
          next()
        }
      } catch (error) {
        // Si la autenticación falla, redirigir al usuario a la página de inicio de sesión
        next({ name: 'login' })
      }
    }
  } else {
    // Si la ruta no requiere autenticación, continuar normalmente
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    // Verificar si el usuario tiene un token de autenticación
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      next({ name: 'login' })
    } else {
      try {
        await AuthApi.admin()
        next()
      } catch (error) {
        // Si la autenticación falla, redirigir al usuario a la página de inicio de sesión
        next({ name: 'login' })
      }
    }
  } else {
    // Si la ruta no requiere autenticación, continuar normalmente
    next()
  }
})

export default router
