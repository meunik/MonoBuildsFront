import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './css/style.css'
import './css/padronizados.css'
import router from "@/router";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.isReady().then(() => {
  app.mount('#app')
})