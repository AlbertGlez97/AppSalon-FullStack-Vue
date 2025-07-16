import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import {plugin , defaultConfig} from '@formkit/vue'
import config from '../formkit.config.js'

const app = createApp(App)

app.use(createPinia())
// Use the FormKit plugin with the default configuration
app.use(plugin, defaultConfig(config))
app.use(router)

// Register the VueDatePicker component globally
// This allows you to use <VueDatePicker> in any component without needing to import it each time
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
