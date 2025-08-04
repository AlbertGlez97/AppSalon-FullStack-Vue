import { defaultConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'

const config = defaultConfig({
  config: {
    // Aquí puedes agregar configuraciones globales para FormKit
    classes: generateClasses({
      global: {
        wrapper: 'space-y-2 mb-3',
        message: 'bg-red-500 text-white text-center text-sm font-bold uppercase p-2 my-5',
        label: 'block mb-1 font-bold text-lg text-white',
        input: 'w-full p-3 border border-gray-300 rounded-lg text-white placeholder-gray-400',
      },
      submit: {
        input: '$reset bg-blue-500 hover:bg-blue-600 rounden-lg text-white font-bold w-full p-3 mt-10',
      }
    }),
  },
})

export default config
