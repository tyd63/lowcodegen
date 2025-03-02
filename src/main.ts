import { createApp } from 'vue'
import App from './App.vue'
import { useElementPlus } from './ui/element-plus'

import 'animate.css'
import './styles/app.scss'

const app = createApp(App)

useElementPlus(app)

app.mount('#app')
