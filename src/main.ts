import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'
import './assets/global.css'
import productsData from './phones.json'

store.dispatch('initializeProducts', productsData)

const app = createApp(App)
app.use(store)
app.mount('#app')
