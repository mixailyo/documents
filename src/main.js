import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import { ru } from '@formkit/i18n'
import App from './App.vue'

import '@formkit/themes/genesis'
import './assets/styles/main.scss'

const app = createApp(App)
app.use(
  plugin,
  defaultConfig({
    // Define additional locales
    locales: { ru },
    // Define the active locale
    locale: 'ru',
  })
)
app.mount('#app')
