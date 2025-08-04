// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './formkit.config.ts', // Asegúrate de incluir el archivo de configuración de FormKit
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: "url('/img/1.jpg')",
      }
    },
  },
  // Removemos el plugin de forms por ahora para evitar conflictos con Tailwind v4
  // plugins: [
  //   require('@tailwindcss/forms')      // añade estilos base a inputs
  // ],
}
