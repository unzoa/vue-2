import Vue from 'vue'
import App from './App'
import store from './vuex'
import router from './config'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
