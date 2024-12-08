import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import naive from "naive-ui"

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(naive).mount('#app')
