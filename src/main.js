import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import './scss/style.scss'

Vue.use(Buefy)
Vue.config.productionTip = false

document.querySelector('body').classList.add('light');

new Vue({
  render: h => h(App),
}).$mount('#app')
