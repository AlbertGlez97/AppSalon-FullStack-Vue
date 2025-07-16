# AppSalon - Front End

Este proyecto se inició con `npm init vue@latest`, configurando las siguientes tecnologías y herramientas:

- **TypeScript**: Permite escribir código más seguro y mantenible gracias a la tipificación estática.
- **Vue Router**: Facilita la navegación entre páginas y la gestión de rutas en la aplicación.
- **Pinia**: Proporciona un sistema de gestión de estado centralizado y eficiente para Vue.
- **TailwindCSS**: Framework de utilidades para estilos rápidos y personalizables en la interfaz.
- **daisyui**: Permite agregar componentes UI pre-diseñados y personalizables sobre TailwindCSS, acelerando el desarrollo de interfaces atractivas.
- **Vue3 Datepicker**: Se instaló [Vue3 Datepicker](https://vue3datepicker.com/props/modes-configuration/), un componente de selección de fechas flexible y personalizable para Vue 3. Permite a los usuarios elegir fechas o rangos de fechas de manera sencilla, soportando diferentes modos de selección y configuraciones para adaptarse a diversas necesidades en formularios o interfaces donde se requiera ingresar fechas.
- **FormKit**: Se instalaron los paquetes `@formkit/vue` y `@formkit/themes` mediante `npm i @formkit/vue @formkit/themes`. FormKit es una librería para la creación de formularios en Vue, que facilita la generación de formularios complejos, validaciones y manejo de estados de manera eficiente y declarativa. Además, permite aplicar temas visuales fácilmente para personalizar la apariencia de los formularios.

Estas herramientas mejoran la estructura, escalabilidad y experiencia de desarrollo en el frontend.

**¿Qué es Pinia?**  
Pinia es una librería de gestión de estado para aplicaciones Vue. Permite centralizar y compartir el estado entre componentes de manera sencilla, reactiva y escalable, facilitando la organización y mantenimiento del código.

## Ejemplo básico de Pinia

1. **Instalación**  
    Si no tienes Pinia instalado, ejecuta:
    ```bash
    npm install pinia
    ```

2. **Configuración en main.ts**
    ```ts
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'
    import App from './App.vue'

    const app = createApp(App)
    app.use(createPinia())
    app.mount('#app')
    ```

3. **Creación de un store**
    ```ts
    // stores/counter.ts
    import { defineStore } from 'pinia'

    export const useCounterStore = defineStore('counter', {
      state: () => ({
         count: 0
      }),
      actions: {
         increment() {
            this.count++
         }
      }
    })
    ```

4. **Uso del store en un componente**
    ```vue
    <script setup lang="ts">
    import { useCounterStore } from '@/stores/counter'

    const counter = useCounterStore()
    </script>

    <template>
      <div>
         <p>Contador: {{ counter.count }}</p>
         <button @click="counter.increment">Incrementar</button>
      </div>
    </template>
    ```

    ## Uso de Axios en el proyecto

    Para realizar peticiones HTTP, este proyecto utiliza **Axios**. Axios es una librería que facilita la comunicación con APIs y el manejo de respuestas de manera sencilla y eficiente.

    **Instalación**  
    Si aún no tienes Axios instalado, ejecuta:
    ```bash
    npm install axios
    ```

    **Ejemplo básico de uso en un componente Vue**
    ```vue
    <script setup lang="ts">
    import axios from 'axios'
    import { ref } from 'vue'

    const data = ref(null)

    const fetchData = async () => {
        const response = await axios.get('https://api.ejemplo.com/endpoint')
        data.value = response.data
    }

    fetchData()
    </script>

    <template>
        <div>
            <pre>{{ data }}</pre>
        </div>
    </template>
    ```

    ## ¿Qué es CORS y cómo se configura?

    **CORS** (Cross-Origin Resource Sharing) es un mecanismo que permite que una aplicación web solicite recursos desde un dominio diferente al que la sirve. Esto es esencial cuando el frontend y el backend se encuentran en servidores distintos.

    La configuración de CORS se realiza en el servidor y define qué orígenes, métodos HTTP y encabezados están permitidos para las solicitudes externas. Una correcta configuración de CORS es fundamental para la seguridad y el funcionamiento adecuado de aplicaciones que consumen APIs desde diferentes dominios.

    Ejemplo básico de configuración en un servidor Express (Node.js):

    ```js
    import cors from 'cors'
    import express from 'express'

    const app = express()

    app.use(cors({
        origin: 'http://localhost:5173', // dominio permitido
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))

    // Resto de la configuración del servidor...
    ```

    > **Nota:** La configuración de CORS siempre se realiza en el backend. El frontend solo consume los recursos permitidos por el servidor.