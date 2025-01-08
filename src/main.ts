import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PigIcon from './components/svg/PigGpt.vue'

const app = createApp(App)

app.component('PigIcon', PigIcon)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
