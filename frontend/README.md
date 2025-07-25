# AppSalon - Front End

Este proyecto se inició con `npm init vue@latest`, configurando las siguientes tecnologías y herramientas:

- **TypeScript**: Permite escribir código más seguro y mantenible gracias a la tipificación estática.

- **Vue Router**: Facilita la navegación entre páginas y la gestión de rutas en la aplicación.

- **Pinia**: Proporciona un sistema de gestión de estado centralizado y eficiente para Vue.

- **TailwindCSS**: Framework de utilidades para estilos rápidos y personalizables en la interfaz.

- **daisyui**: Permite agregar componentes UI pre-diseñados y personalizables sobre TailwindCSS, acelerando el desarrollo de interfaces atractivas.

- **Vue3 Datepicker**: Se instaló [Vue3 Datepicker](https://vue3datepicker.com/props/modes-configuration/), un componente de selección de fechas flexible y personalizable para Vue 3. Permite a los usuarios elegir fechas o rangos de fechas de manera sencilla, soportando diferentes modos de selección y configuraciones para adaptarse a diversas necesidades en formularios o interfaces donde se requiera ingresar fechas.

- **FormKit**: Se instalaron los paquetes `@formkit/vue` y `@formkit/themes` mediante `npm i @formkit/vue @formkit/themes`. FormKit es una librería para la creación de formularios en Vue, que facilita la generación de formularios complejos, validaciones y manejo de estados de manera eficiente y declarativa. Además, permite aplicar temas visuales fácilmente para personalizar la apariencia de los formularios.

- **vue-toast-notification**: Se instaló mediante `npm i vue-toast-notification`. Esta librería permite mostrar notificaciones tipo "toast" (mensajes emergentes y temporales) en la interfaz de usuario. Es útil para informar al usuario sobre acciones exitosas, advertencias, errores u otra información relevante de manera visual y no intrusiva. Su integración es sencilla y personalizable, facilitando la mejora de la experiencia de usuario en la aplicación.

- **date-fns**: Se instaló mediante `npm i date-fns`. Esta librería proporciona funciones utilitarias para el manejo y manipulación de fechas en JavaScript. Permite formatear, comparar, calcular intervalos y realizar operaciones complejas con fechas de manera sencilla y eficiente, facilitando el trabajo con fechas en el frontend sin depender de objetos Date nativos o librerías más pesadas.

Estas herramientas mejoran la estructura, escalabilidad y experiencia de desarrollo en el frontend.

**JWT (JSON Web Token)**  
JWT es un estándar abierto (RFC 7519) que define un método compacto y seguro para transmitir información entre partes como un objeto JSON. Se utiliza principalmente para autenticación y autorización en aplicaciones web. Un JWT contiene tres partes: encabezado (HTTP, URL), payload (carga útil) y firma. El servidor genera el token tras autenticar al usuario y lo envía al cliente, quien lo incluye en cada solicitud para acceder a recursos protegidos. La firma garantiza que el contenido no ha sido alterado.

**¿Por qué se dice que JWT es sin estado?**  
Se dice que JWT (JSON Web Token) es "sin estado" porque el servidor no necesita almacenar información de sesión sobre el usuario entre solicitudes. Toda la información relevante (como la identidad del usuario y sus permisos) se incluye en el propio token, que es enviado por el cliente en cada petición. El servidor solo verifica la validez y la firma del token, sin consultar una base de datos o memoria para validar la sesión.

**Ejemplo de uso de JWT en una petición HTTP:**

Supongamos que el usuario inicia sesión y el backend responde con un JWT. En las siguientes solicitudes, el frontend envía el token en el encabezado `Authorization`:

```js
import axios from 'axios'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

axios.get('https://api.ejemplo.com/usuario', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    console.log(response.data)
})
.catch(error => {
    console.error(error)
})
```

En este ejemplo, el servidor valida el token en cada solicitud, sin necesidad de mantener un registro de sesiones activas, lo que hace que la autenticación sea sin estado.

**¿Dónde se puede almacenar el JWT en el frontend?**

El JWT puede almacenarse en el frontend principalmente en dos lugares:

- **LocalStorage**: Permite guardar el token de forma persistente en el navegador, incluso si el usuario cierra la pestaña o el navegador. Ejemplo:
    ```js
    localStorage.setItem('token', jwt)
    ```
    Es fácil de usar, pero es vulnerable a ataques XSS.

- **SessionStorage**: Similar a LocalStorage, pero el token solo se mantiene mientras la pestaña esté abierta. Ejemplo:
    ```js
    sessionStorage.setItem('token', jwt)
    ```

- **Cookies**: Se puede almacenar el JWT en una cookie, preferiblemente con las opciones `HttpOnly` y `Secure` para mayor seguridad. Esto ayuda a proteger el token de ataques XSS, aunque requiere configuración desde el backend.

> **Recomendación:** No almacenar el JWT en LocalStorage o SessionStorage si la aplicación maneja información sensible. Para mayor seguridad, utiliza cookies con las banderas adecuadas y considera los riesgos de cada método.

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