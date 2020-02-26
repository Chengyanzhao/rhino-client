import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Axios from '@/utils/plugins/Axios'
import Animate from './directions/animate'
import './assets/css/animage.scss'
import './assets/css/basic.scss'
import './assets/css/theme.scss'

Vue.use(Animate)
Vue.use(Axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
