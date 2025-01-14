import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PigIcon from './components/svg/PigGpt.vue'
import SubmitIco from './components/svg/Submit.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('PigIcon', PigIcon)
app.component('SubmitIco', SubmitIco)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
