import {createApp} from 'vue'
import App from './App'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

const myApp = createApp(App).use(VueMaterial);
myApp.mount('#app');