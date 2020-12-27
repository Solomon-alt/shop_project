import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './http/api'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import { checkLogin, save } from './utils/index'

Vue.use(Vant);
Vue.prototype.$api = api
Vue.prototype.$checkLogin = checkLogin
Vue.prototype.$save = save
BScroll.use(Pullup)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')