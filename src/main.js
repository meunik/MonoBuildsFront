import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import router from "@/router";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.isReady().then(() => {
  app.mount('#app')
})