// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './formkit.config.js', // Asegúrate de incluir el archivo de configuración de FormKit
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: "url('/img/1.jpg')",
      }
    },
  },
   plugins: [
    require('@tailwindcss/forms')      // añade estilos base a inputs
  ],
}
