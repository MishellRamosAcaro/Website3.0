import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import { setSessionExpiredHandler } from './lib/api/axiosConfig'
import { useAuthStore } from './stores/auth'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
setSessionExpiredHandler(() => useAuthStore(pinia).logout())
app.use(router)
app.use(PrimeVue, { unstyled: true })
app.use(MotionPlugin)

app.mount('#app')
