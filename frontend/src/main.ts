import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import {plugin, defaultConfig} from '@formkit/vue'
import config from '../formkit.config.ts'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast({
    position: 'top-right',
    duration: 5000
})

const app = createApp(App)

// La siguiente línea registra (inyecta) el objeto $toast en el sistema de inyección de dependencias de Vue.
// Esto permite que cualquier componente hijo acceda a $toast usando inject('$toast').
// 'provide' es un método de la instancia de la aplicación Vue que facilita compartir datos o servicios globalmente.
app.provide('$toast', $toast);

app.use(createPinia())
// Use the FormKit plugin with the simplified configuration
app.use(plugin, defaultConfig(config))
app.use(router)

// Register the VueDatePicker component globally
// This allows you to use <VueDatePicker> in any component without needing to import it each time
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
