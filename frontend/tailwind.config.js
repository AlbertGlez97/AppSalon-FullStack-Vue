// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // ¡fíjate en la comilla de cierre antes del paréntesis!
        app: "url('/img/1.jpg')",
      },
    },
  },
  plugins: [],
}
