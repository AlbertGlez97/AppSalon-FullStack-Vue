# AppSalon - Backend

Este proyecto corresponde al backend de AppSalon, desarrollado con Node.js y Express siguiendo el patrón Modelo-Vista-Controlador (MVC) para mantener una estructura de código clara y escalable.

## Pasos iniciales

- El proyecto se inicializó con `npm init` para crear el archivo `package.json` y gestionar las dependencias.
- Se instaló **Express** con `npm install express`, el framework utilizado para construir la API RESTful.
- Se instaló **dotenv** con `npm install dotenv` para gestionar variables de entorno. Esta biblioteca permite cargar variables definidas en un archivo `.env` al entorno de Node.js, facilitando la configuración de credenciales sensibles y parámetros de la aplicación sin exponerlos directamente en el código fuente.
- Se instaló **colors** con `npm install colors`, una biblioteca que permite agregar estilos y colores a los mensajes mostrados en la consola, facilitando la visualización de logs y errores durante el desarrollo.

## Estructura del proyecto

- Se implementa el patrón **Modelo-Vista-Controlador (MVC)**, lo que permite separar la lógica de negocio, la gestión de datos y las rutas, facilitando el mantenimiento y la escalabilidad del código.

## Base de datos

- Para la gestión de datos se utiliza **MongoDB** como base de datos NoSQL. Puedes obtener más información en [MongoDB](https://www.mongodb.com/).
- La conexión y manipulación de la base de datos se realiza mediante un ORM (Object-Relational Mapping), permitiendo interactuar con MongoDB usando objetos de JavaScript.
- Se recomienda instalar **MongoDB Compass** para visualizar y administrar la base de datos de forma gráfica y sencilla.
- Se utilizará [Mongoose](https://mongoosejs.com/), una biblioteca de modelado de objetos para MongoDB en Node.js. Mongoose facilita la definición de esquemas, la validación de datos y la interacción con la base de datos de manera sencilla y estructurada. Se instalo con `npm install mongoose`

## Recomendaciones adicionales

- Configura variables de entorno para almacenar credenciales sensibles y la URL de conexión a la base de datos.
- Utiliza controladores para manejar la lógica de las rutas y modelos para definir la estructura de los datos.
- Realiza pruebas de la API utilizando herramientas como Postman o Insomnia.

---
Este archivo README proporciona una visión general de la configuración y estructura del backend de AppSalon. Para más detalles, consulta la documentación de cada dependencia y revisa la estructura de carpetas del proyecto.