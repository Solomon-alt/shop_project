import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shopNumber: 0,
        evaluateNumber: 0,
    },
    mutations: {
        modify(state, data) {
            state.shopNumber = data
        },
        change(state, evaluate) {
            state.evaluateNumber = evaluate
        }
    },
    actions: {},
    modules: {},
})