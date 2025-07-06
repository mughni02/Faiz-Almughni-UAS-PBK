import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// DIUBAH: Impor file CSS global kita.
// Pastikan path ini sesuai dengan lokasi file style.css Anda.
import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
