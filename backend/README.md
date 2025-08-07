# AppSalon - Backend

Este proyecto corresponde al backend de AppSalon, desarrollado con Node.js y Express siguiendo el patrón Modelo-Vista-Controlador (MVC) para mantener una estructura de código clara y escalable.

## Pasos iniciales

- El proyecto se inicializó con `npm init` para crear el archivo `package.json` y gestionar las dependencias.
- Se instaló **Express** con `npm install express`, el framework utilizado para construir la API RESTful.
- Se instaló **dotenv** con `npm install dotenv` para gestionar variables de entorno. Esta biblioteca permite cargar variables definidas en un archivo `.env` al entorno de Node.js, facilitando la configuración de credenciales sensibles y parámetros de la aplicación sin exponerlos directamente en el código fuente.
- Se instaló **colors** con `npm install colors`, una biblioteca que permite agregar estilos y colores a los mensajes mostrados en la consola, facilitando la visualización de logs y errores durante el desarrollo.
- Se instaló **date-fns** con `npm install date-fns`, una biblioteca para el manejo y manipulación de fechas en JavaScript. Date-fns proporciona funciones útiles para formatear, comparar, calcular intervalos y realizar operaciones con fechas de manera sencilla y eficiente, facilitando el trabajo con fechas en el backend sin depender de objetos Date nativos.

## Estructura del proyecto

- Se implementa el patrón **Modelo-Vista-Controlador (MVC)**, lo que permite separar la lógica de negocio, la gestión de datos y las rutas, facilitando el mantenimiento y la escalabilidad del código.

## Base de datos

- Para la gestión de datos se utiliza **MongoDB** como base de datos NoSQL. Puedes obtener más información en [MongoDB](https://www.mongodb.com/).
- La conexión y manipulación de la base de datos se realiza mediante un ORM (Object-Relational Mapping), permitiendo interactuar con MongoDB usando objetos de JavaScript.
- Se recomienda instalar **MongoDB Compass** para visualizar y administrar la base de datos de forma gráfica y sencilla.
- Se utilizará [Mongoose](https://mongoosejs.com/), una biblioteca de modelado de objetos para MongoDB en Node.js. Mongoose facilita la definición de esquemas, la validación de datos y la interacción con la base de datos de manera sencilla y estructurada. Se instalo con `npm install mongoose`

## Cors

- Se instaló **cors** con `npm install cors` para permitir solicitudes desde diferentes orígenes (Cross-Origin Resource Sharing). Esta biblioteca se configuró en el proyecto para habilitar el acceso a la API desde aplicaciones frontend alojadas en dominios distintos, mejorando la interoperabilidad y seguridad.

## bcrypt

- Se instaló **bcrypt** con `npm install bcrypt`, una biblioteca utilizada para el hash y la verificación de contraseñas de forma segura. Permite almacenar contraseñas en la base de datos de manera cifrada, protegiendo la información sensible de los usuarios frente a posibles accesos no autorizados.

## Mailtrap

- Se utilizará [Mailtrap](https://mailtrap.io/), un servicio que permite simular el envío de correos electrónicos en entornos de desarrollo y pruebas. Mailtrap captura los correos enviados desde la aplicación sin que lleguen a destinatarios reales, facilitando la verificación del contenido y formato de los emails generados por el backend. Esto es útil para probar funcionalidades como confirmación de registro, recuperación de contraseñas y notificaciones, asegurando que los correos se envían correctamente antes de pasar a producción.

## Nodemailer

- Para utilizar Mailtrap es necesario instalar [nodemailer](https://nodemailer.com/) con `npm install nodemailer`. Nodemailer es una biblioteca para Node.js que permite enviar correos electrónicos de manera sencilla desde el backend. Facilita la integración con servicios de correo como Mailtrap, permitiendo configurar transportes SMTP, definir remitentes, destinatarios, asuntos y cuerpos de los mensajes. Es ampliamente utilizada para implementar funcionalidades como confirmación de cuentas, recuperación de contraseñas y notificaciones automáticas en aplicaciones web.

## JWT

- Se utilizará **JWT (JSON Web Token)**, una tecnología para la autenticación y autorización segura de usuarios en aplicaciones web. JWT permite generar tokens firmados que se envían al cliente tras el inicio de sesión y se utilizan para acceder a rutas protegidas sin necesidad de almacenar sesiones en el servidor.
- Se instala con `npm install jsonwebtoken`.
- JWT es ampliamente utilizado para proteger rutas privadas, validar la identidad del usuario y mantener la seguridad en la comunicación entre el frontend y el backend.

## Deploy Backen en fl0.com

[fl0.com](https://fl0.com/) es una plataforma en la nube que permite desplegar aplicaciones backend y bases de datos de manera sencilla y rápida. Ofrece una interfaz intuitiva para gestionar el ciclo de vida de tus aplicaciones, facilitando el despliegue continuo, la escalabilidad y la integración con servicios como MongoDB, variables de entorno y pipelines de CI/CD. Es ideal para desarrolladores que buscan una solución de hosting moderna y sin complicaciones para sus proyectos Node.js y APIs RESTful.


## Recomendaciones adicionales

- Configura variables de entorno para almacenar credenciales sensibles y la URL de conexión a la base de datos.
- Utiliza controladores para manejar la lógica de las rutas y modelos para definir la estructura de los datos.
- Realiza pruebas de la API utilizando herramientas como Postman o Insomnia.

---
Este archivo README proporciona una visión general de la configuración y estructura del backend de AppSalon. Para más detalles, consulta la documentación de cada dependencia y revisa la estructura de carpetas del proyecto.