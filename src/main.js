import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './css/style.css';
import './css/padronizados.css';

import router from "@/router";

import moment from 'moment';

moment.locale('pt-br', {
  relativeTime : {
    future: "em %s",
    past:   "%s atrás",
    s  : 'a few seg',
    ss : '%d seg',
    m:  "a min",
    mm: "%d min",
    h:  "%dh",
    hh: "%dh",
    d:  "%dd",
    dd: "%dd",
    w:  "%ds",
    ww: "%ds",
    M:  "%dm",
    MM: "%dm",
    y:  "a ano",
    yy: "%d anos"
  }
});

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
import directives from "./directives";
app.directive("hover", directives);

router.isReady().then(() => {
  app.mount('#app')
})