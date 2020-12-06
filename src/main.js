import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import './scss/style.scss'
import router from './router'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
    router,
    data() {
        return {
            transitionName: 'slide-left'
        }
    },
    mounted() {
        this.$Progress.finish()
    },
    created() {
        this.$Progress.start()
        this.$router.beforeEach((to, from, next) => {
            if (to.meta.progress !== undefined) {
                const meta = to.meta.progress
                this.$Progress.parseMeta(meta)
            }
            this.$Progress.start()
            next()
        })
        this.$router.afterEach(() => {
            this.$Progress.finish()
        })
    },
    watch: {
        '$route'(to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    render: h => h(App)
}).$mount('#app')
