import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { unstyled: true })
app.use(ToastService)
app.use(MotionPlugin)

app.mount('#app')
