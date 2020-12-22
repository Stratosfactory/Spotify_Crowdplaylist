import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes"


import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primevue/resources/themes/md-light-deeppurple/theme.css"





const app = createApp(App)

app.use(router)

app.mount('#app')