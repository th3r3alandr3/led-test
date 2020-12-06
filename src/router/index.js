import Vue from 'vue'
import VueRouter from 'vue-router'
import VueProgressBar from 'vue-progressbar';
import MultiLED from '../views/MultiLed.vue'
import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)

Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  color: '#7957d5',
  failedColor: '#8d0000',
  thickness: '2px',
  transition: {
    speed: '1.5s',
    opacity: '0.6s',
    termination: 400
  },
  autoRevert: true,
  location: 'top',
  inverse: false
});

const routes = [
  {
    path: '/',
    name: 'MultiLED',
    component: MultiLED
  },
  {
    path: '/einzelnd',
    name: 'SingleLED',
    component: () => import('../views/SingleLed.vue')
  },
  {
    path: '/effekte',
    name: 'Effects',
    component: () => import('../views/Effects.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-active',
  linkActiveClass: '',
  routes
})

export default router
